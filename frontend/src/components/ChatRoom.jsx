import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

function ChatRoom() {
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState('');
  const [userId, setUserId] = useState('');
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messageRef = useRef(null);
    const userID = window.localStorage.getItem("userID")
  useEffect(() => {
    // Connect to the server
    const newSocket = io('http://localhost:8080'); // Replace with your server URL
    setSocket(newSocket);

    // Clean up the socket connection on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const joinRoom = () => {
    if (roomId && userID) {
      socket.emit('joinRoom', roomId, userID);
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      socket.emit('sendMessage', roomId, newMessage, userId);
      setNewMessage('');
      messageRef.current.value = '';
    }
  };

  useEffect(() => {
    if (socket) {
      // Handle user joining a room
      socket.on('userJoined', ({ userID, connectedUsers }) => {
        setConnectedUsers(connectedUsers);
      });

      // Handle receiving a message
      socket.on('receiveMessage', ({ message, userID }) => {
        setMessages((prevMessages) => [...prevMessages, { message, userID }]);
      });

      // Handle user leaving a room
      socket.on('userLeft', ({ userID, connectedUsers }) => {
        setConnectedUsers(connectedUsers);
      });
    }
  }, [socket]);

  return (
    <div>
      <h1>Chat Room</h1>
      <div>
        <label htmlFor="roomId">Room ID:</label>
        <input
          type="text"
          id="roomId"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
      <div>
        <h2>Connected Users:</h2>
        <ul>
          {connectedUsers.map((user) => (
            <li key={user.userId}>{user.userId}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Chat History:</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              {msg.userId}: {msg.message}
            </li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            ref={messageRef}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
