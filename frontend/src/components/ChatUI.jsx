import React, { useContext, useEffect, useState } from "react";
import { CloseIcon, SendIcon } from "./Icons";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { firebaseApp } from "../services/firebase_init";
import { Context } from "../context/ContextProvider";
import { getChatId } from "../services/constants";

function ChatUI({ closeChat, activeChat, setActiveChat }) {
  const { userID, showAlert } = useContext(Context);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = async (e) => {
    if (e.key === "Enter" && newMessage.trim() !== "") {
      e.preventDefault();
      try {
        const chatId = getChatId(userID, activeChat._id);
        const chatRef = collection(firebaseApp, `chats/${chatId}/chatRoom`);
        await addDoc(chatRef, {
          message: newMessage,
          sendBy: userID,
          id: serverTimestamp(),
          createdAt: new Date().toLocaleDateString("en-US"),
        });
        setNewMessage("");
      } catch (error) {
        console.log(error);
        showAlert("Unable to send message!", true);
      }
    } else if (newMessage.trim() === "") return;
  };

  useEffect(() => {
    const chatId = getChatId(userID, activeChat._id);
    const chatRef = collection(firebaseApp, `chats/${chatId}/chatRoom`);
    const unsubscribe = onSnapshot(chatRef, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({ ...doc.data() }));
      setMessages(
        documents.sort(
          (a, b) =>
            new Date(a.id.seconds).getTime() - new Date(b.id.seconds).getTime()
        )
      );
    });

    return unsubscribe;
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="h-full w-full rounded-xl bg-white border p-2">
        <div className="flex gap-2">
          <button
            onClick={() => {
              closeChat();
              setActiveChat(null);
            }}
            className="rounded-xl bg-gray-100 hover:bg-gray-300 flex items-center justify-center p-2"
          >
            <CloseIcon />
          </button>
          <div className="w-full p-2 bg-gray-100 flex items-center gap-2 rounded-xl truncate">
            <div className="h-7 w-7 overflow-hidden rounded-full flex-shrink-0">
              <img
                src={`http://localhost:8080/users-images/${activeChat.avatar}`}
                alt="profile-image"
              />
            </div>
            <div>
              <p className="text-sm font-medium">{activeChat.name}</p>
              <p className="text-xs truncate">{activeChat.email}</p>
            </div>
          </div>
        </div>

        <div className="h-[400px] overflow-y-auto w-full bg-gray-50 mt-1 rounded-xl">
          {messages.length > 0 ? (
            messages.map((data, index) => (
              <div key={data.id}>
                <MessageBox myUserID={userID} data={data} />
              </div>
            ))
          ) : (
            <p className="mx-auto text-center">No Chats!</p>
          )}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            className="textfield outline-none rounded-xl"
            placeholder="Message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleSubmit}
          />
          <button
            type="submit"
            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-blue-500 bg-blue-700"
          >
            <SendIcon color="text-white" />
          </button>
        </div>
      </div>
    </form>
  );
}

export default ChatUI;

function MessageBox({ data, myUserID }) {
  return (
    data && (
      <div
        className={`p-2 flex ${
          data.sendBy == myUserID ? "justify-end " : "justify-start "
        }`}
      >
        <div
          className={`flex flex-col justify-end ${
            data.sendBy == myUserID ? "items-end" : "items-start"
          } gap-1`}
        >
          <div className="bg-white px-2 py-1 border">
            <p className="text-sm">{data.message}</p>
          </div>
          <p className="text-xs text-gray-500">{data.createdAt}</p>
        </div>
      </div>
    )
  );
}
