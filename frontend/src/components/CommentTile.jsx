import React, { useState } from "react";
import { SendIcon } from "./Icons";

function CommentTile({ commentsList, commentData }) {
  const [newReply, setNewReply] = useState("");
  const [likeComment, setLikeComment] = useState(false);

  //   --------------------------------------------------------------
  const handleReplySubmit = async (e, parentCommentId) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/comments/", {
        userID,
        postID,
        content: newReply,
        parentComment: parentCommentId,
      });

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === parentCommentId
            ? { ...comment, replies: [...comment.replies, res.data] }
            : comment
        )
      );

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
  return (
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
          <span>.</span>
          <span className="font-semibold cursor-pointer">Reply</span>
          <span>.</span>
          10m
        </div>
        {/* Replies */}
        {/* {commentData.replies.length > 0 && (
          <div className="ml-8">
            {
              <RenderReplies
                commentsList={commentsList}
                comment={commentData}
                replyIds={commentData.replies}
                handleReplySubmit={handleReplySubmit}
                setNewReply={setNewReply}
              />
            }
          </div>
        )} */}

        <div className="ml-8">
          <form onSubmit={(e) => handleReplySubmit(e, comment._id)}>
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

const RenderReplies = ({
  commentsList,
  comment,
  replyIds,
  handleReplySubmit,
  setNewReply,
}) => {
  //   if (comment) {
  // comment.map((data, index) => {
  //   console.log(index + " -> " + data);
  // });
  // console.log(comment.content);
  console.log(commentsList);
  //   }
  return (
    <div>
      {/* <div>{comment.replies}</div> */}
      {replyIds.map((replyId, index) => {
        commentsList &&
          commentsList.map((comment) => {
            if (comment._id == replyId) {
              const reply = comment;
              console.log(reply);
              return <div>{reply.content}</div>;
            }
          });
        // console.log(reply);
        // return <div>{reply.content}</div>;
      })}
    </div>
  );
  //   return replyIds.map((replyId) => {
  //     const reply = comments.find((comment) => comment._id === replyId);
  //     if (!reply) return null;
  //     return (
  //       <div key={replyId} className="flex space-x-2">
  //         <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
  //           <img
  //             src="https://source.unsplash.com/random"
  //             alt="Profile Picture"
  //             className="rounded-full w-full h-full object-cover"
  //           />
  //         </div>
  //         <div>
  //           <div className="bg-gray-100 dark:bg-dark-third p-2 rounded-2xl text-sm">
  //             <span className="font-semibold block">{reply.name}</span>
  //             <span>{reply.content}</span>
  //           </div>
  //           <div className="p-2 text-xs text-gray-500 dark:text-dark-txt">
  //             <span className="font-semibold cursor-pointer">Like</span>
  //             <span>.</span>
  //             <span className="font-semibold cursor-pointer">Reply</span>
  //             <span>.</span>
  //             10m
  //           </div>
  //           {/* Nested Replies */}
  //           {reply.replies.length > 0 && (
  //             <div className="ml-8">
  //               {renderReplies(reply.replies, setNewReply)}
  //             </div>
  //           )}
  //           {/* Reply Form */}
  //           <div className="ml-8">
  //             <form onSubmit={(e) => handleReplySubmit(e, reply._id)}>
  //               {/* ... (reply form) */}
  //             </form>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   });
};

export default CommentTile;
