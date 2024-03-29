import { React, useState, useEffect } from "react";
import axios from "axios";
import {
  SendIcon
} from "./Icons";

export const CommentComponent = ({ postID, userID }) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const handlePostComment = async (e) => {
    e.preventDefault();
    console.log("New comment:", newComment);
    try {
      const res = await axios.post("http://localhost:8080/comments/", {
        userID,
        postID,
        content: newComment,
      });
      console.log(res);
      setComments((prevComments) => [...prevComments, res.data]);
    } catch (e) {
      console.error("Error Creating Comments:-", e);
    }

    setNewComment("");
  };
  useEffect(() => {
    const fetchComments = async (postID) => {
      try {
        const res = await axios.get(
          `http://localhost:8080/comments/post/${postID}`
        );
        console.log(res.data);
        setComments(res.data);
      } catch (e) {
        console.error("Error Getting Comments:-", e);
      }
    };
    fetchComments(postID);
  }, []);

  return (
    <div>
      {/* LIST COMMENT */}
      <div className="py-2 px-4">
        {/* COMMENT */}

        {comments.length === 0
          ? "No Comments Yet"
          : comments.map((comment, index) => {
              return (
                <div key={index} className="flex space-x-2">
                  <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src="https://source.unsplash.com/random"
                      alt="Profile Picture"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="bg-gray-100 dark:bg-dark-third p-2 rounded-2xl text-sm">
                      <span className="font-semibold block">{comment.name}</span>
                      <span>{comment.content}</span>
                    </div>
                    <div className="p-2 text-xs text-gray-500 dark:text-dark-txt">
                      <span className="font-semibold cursor-pointer">Like</span>
                      <span>.</span>
                      <span className="font-semibold cursor-pointer">
                        Reply
                      </span>
                      <span>.</span>
                      10m
                    </div>
                    {/* COMMENT
            <div className="flex space-x-2">
              <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src="https://source.unsplash.com/random"
                  alt="Profile Picture"
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="bg-gray-100 dark:bg-dark-third p-2 rounded-2xl text-sm">
                  <span className="font-semibold block">John Doe</span>
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </span>
                </div>
                <div className="p-2 text-xs text-gray-500 dark:text-dark-txt">
                  <span className="font-semibold cursor-pointer">Like</span>
                  <span>.</span>
                  <span className="font-semibold cursor-pointer">Reply</span>
                  <span>.</span>
                  10m
                </div>
              </div>
            </div> */}
                    {/* END COMMENT */}
                  </div>
                </div>
              );
            })}
        {/* END COMMENT */}
      </div>
      {/* END LIST COMMENT */}
      {/* COMMENT FORM */}
      <div className="py-2 px-4">
        <div className="flex space-x-2">
          <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
            <img
              src="https://source.unsplash.com/random"
              alt="Profile Picture"
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 flex bg-gray-100 dark:bg-dark-third rounded-full items-center">
            <form onSubmit={handlePostComment} className="flex w-full">
              <input
                type="text"
                placeholder="   Write a comment..."
                className="outline-none bg-transparent flex-1 rounded-l-full"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              />
              <button
                type="submit"
                className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-white hover:bg-gray-300 transition-colors duration-300"
              >
                <SendIcon />
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* END COMMENT FORM */}
    </div>
  );
};
