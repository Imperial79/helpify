import React, { useContext, useState } from "react";
import { SendIcon } from "./Icons";
import axios from "axios";
import { Context } from "../context/ContextProvider";

function CommentTile({ commentData, replies, userID, postID }) {
  const [newReply, setNewReply] = useState("");
  const [likeComment, setLikeComment] = useState(false);
  const [incomingReplies, setIncomingReplies] = useState(replies);
  //   --------------------------------------------------------------
  const { usersList } = useContext(Context);
  const handleReplySubmit = async (e, parentCommentId) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/comments/", {
        userID,
        postID,
        content: newReply,
        parent_id: parentCommentId,
      });
      setIncomingReplies((prevReplies) => [...prevReplies, res.data]);
      // Clear the reply input field
      setNewReply("");
    } catch (e) {
      console.error("Error Creating Reply:-", e);
    }
  };
  const handleLike = async (commentID) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/comments/${commentID}/like`,
        {
          userID,
        }
      );
      // Update the comments state with the updated comment data
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentID ? res.data : comment
        )
      );
    } catch (e) {
      console.error("Error Liking Comment:-", e);
    }
  };
  function formatDateTime(timeString) {
    const date = new Date(timeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }
  return (
    <div className="flex space-x-2">
      <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
        <img
          src={
            usersList &&
            usersList.filter((user) => user._id === commentData.user_id)[0]
              .avatar
              ? `http://localhost:8080/users-images/${
                  usersList.filter(
                    (user) => user._id === commentData.user_id
                  )[0].avatar
                }`
              : "/no-image.jpg"
          }
          alt="Profile Picture"
          className="rounded-full w-full h-full object-cover"
        />
      </div>
      <div>
        <div className="bg-gray-100 dark:bg-dark-third p-2 rounded-2xl text-sm">
          <span className="font-semibold block">{commentData.name}</span>
          <span>{commentData.content}</span>
        </div>
        <div className="p-2 text-xs text-gray-500 dark:text-dark-txt">
          <span
            className="font-semibold cursor-pointer"
            onClick={() => handleLike(commentData._id)}
          >
            {likeComment ? "Unlike" : "Like"} ({commentData.likes.length})
          </span>
          <span> </span>
          <span className="font-semibold cursor-pointer">Reply</span>
          <span> </span>
          {formatDateTime(commentData.createdAt)}
        </div>
        {/* Replies */}
        {incomingReplies.length > 0 &&
          incomingReplies.map((reply, index) => {
            return (
              <div key={index} className="flex space-x-2">
                {" "}
                <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
                  {" "}
                  <img
                    src={
                      usersList &&
                      usersList.filter((user) => user._id === reply.user_id)[0]
                        .avatar
                        ? `http://localhost:8080/users-images/${
                            usersList.filter(
                              (user) => user._id === reply.user_id
                            )[0].avatar
                          }`
                        : "/no-image.jpg"
                    }
                    alt="Profile Picture"
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="bg-gray-100 dark:bg-dark-third p-2 rounded-2xl text-sm">
                    <span className="font-semibold block">{reply.name}</span>
                    <span>{reply.content}</span>
                  </div>
                  <div className="p-2 text-xs text-gray-500 dark:text-dark-txt">
                    <span className="font-semibold cursor-pointer">Like</span>
                    <span> </span>
                    <span className="font-semibold cursor-pointer">Reply</span>
                    <span> </span>
                    {formatDateTime(reply.createdAt)}
                  </div>
                  {/* Nested Replies
                    {reply.replies.length > 0 && (
                      <div className="ml-8">
                        {renderReplies(reply.replies, setNewReply)}
                      </div>
                    )} */}
                  {/* Reply Form */}
                  {/* <div className="ml-8">
                      <form onSubmit={(e) => handleReplySubmit(e, reply._id)}> */}
                  {/* ... (reply form) */}
                  {/* </form>
                    </div> */}
                </div>
              </div>
            );
          })}

        <div className="ml-8 flex">
          <form
            onSubmit={(e) => handleReplySubmit(e, commentData._id)}
            className="flex flex-grow"
          >
            <input
              type="text"
              placeholder="Reply..."
              className="outline-none bg-transparent flex-1 rounded-l-full px-3"
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              required
            />
            <button
              type="submit"
              className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-gray-300 transition-colors duration-300 ${
                newReply == "" ? "bg-gray-200" : "bg-blue-700"
              }`}
            >
              <SendIcon
                color={`${newReply == "" ? "text-gray-600" : "text-white"}`}
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CommentTile;
