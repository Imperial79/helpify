import { React, useState, useEffect } from "react";
import axios from "axios";
import { SendIcon } from "./Icons";
import CommentTile from "./CommentTile";

export const CommentComponent = ({ postID, userID }) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [newReply, setNewReply] = useState("");
  const [likeComment, setLikeComment] = useState(false);
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

  const rootComments = comments.filter(comment=>comment.parent_id===null);
  const replyComments = (parentCommentID)=>comments.filter(comment=>comment.parent_id===parentCommentID);
  // const handleReplySubmit = async (e, parentCommentID) => {
  //   e.preventDefault();

  //   try {
  //     const res = await axios.post("http://localhost:8080/comments/", {
  //       userID,
  //       postID,
  //       content: newReply,
  //       parentComment: parentCommentId,
  //     });

  //     setComments((prevComments) =>
  //       prevComments.map((comment) =>
  //         comment._id === parentCommentId
  //           ? { ...comment, replies: [...comment.replies, res.data] }
  //           : comment
  //       )
  //     );

  //     // Clear the reply input field
  //     setNewReply("");
  //   } catch (e) {
  //     console.error("Error Creating Reply:-", e);
  //   }
  // };
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
  // const handleLike = async (commentID) => {
  //   try {
  //     const res = await axios.put(
  //       `http://localhost:8080/comments/${commentID}/like`,
  //       {
  //         userID,
  //       }
  //     );
  //     // Update the comments state with the updated comment data
  //     setComments((prevComments) =>
  //       prevComments.map((comment) =>
  //         comment._id === commentID ? res.data : comment
  //       )
  //     );
  //   } catch (e) {
  //     console.error("Error Liking Comment:-", e);
  //   }
  // };
  return (
    <div>
      {/* LIST COMMENT */}
      <div className="py-2 px-4">
        {/* COMMENT */}

        {rootComments.length > 0 &&
          rootComments.map((commentData, index) => {
            return (
              <div key={index}>
                <CommentTile
                  commentData={commentData}
                  replies={replyComments(commentData._id)}
                  userID={userID}
                  postID={postID}
                />
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
                placeholder="Write a comment..."
                className="outline-none bg-transparent flex-1 rounded-l-full px-3"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              />
              <button
                type="submit"
                className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-gray-300 transition-colors duration-300 ${
                  newComment == "" ? "bg-gray-200" : "bg-blue-700"
                }`}
              >
                <SendIcon
                  color={`${newComment == "" ? "text-gray-600" : "text-white"}`}
                />
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* END COMMENT FORM */}
    </div>
  );
};

// const renderReplies = (comments,replyIds, setNewReply) => {
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
// };
