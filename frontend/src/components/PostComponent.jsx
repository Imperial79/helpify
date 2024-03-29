import { useContext, useState } from "react";
import { Context } from "../context/ContextProvider";
import {
  AnncounceIcon,
  CommentIcon,
  DeleteIcon,
  EditIcon,
  LikeFilledIcon,
  LikeIcon,
  LostnFoundIcon,
  MenuIcon,
  ShareIcon,
} from "./Icons";

export const PostComponent = ({
  postType = "Announcement",
  postID,
  content,
  likes,
  currentUser,
  createdAt,
}) => {
  const { userID } = useContext(Context);
  const [showPostMenu, setShowPostMenu] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [isLiked, setIsLiked] = useState(likes.includes(userID));

  //   ----------------------------------------------------

  async function deletePost(postID) {
    try {
      const res = await axios.delete(`http://localhost:8080/posts/${postID}`);
      console.log(res);
      // Remove the deleted post from the posts state
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postID));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  const handleLike = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/posts/${postID}/like`,
        { userID: userID }
      );

      setLikeCount(response.data.likes.length);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  function formatDateTime(timeString) {
    const date = new Date(timeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero for single-digit months
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }
  const postTime = formatDateTime(createdAt);

  return (
    <div className="border-2 bg-white mt-4 rounded-lg">
      {/* POST AUTHOR */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex space-x-2 items-center gap-2">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <img
              src="https://source.unsplash.com/random"
              alt="Profile Picture"
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-semibold">
              {currentUser && currentUser.name}
            </div>
            <small>{postTime}</small>
          </div>
        </div>

        <div className="relative">
          {currentUser._id === userID && (
            <button
              onClick={() => {
                setShowPostMenu(!showPostMenu);
              }}
              className="hover:bg-gray-200 rounded-full p-2"
            >
              <MenuIcon size={"h-6 w-6"} />
            </button>
          )}

          <div
            className={`${
              showPostMenu ? "opacity-100" : "opacity-0 pointer-events-none"
            } absolute shadow-lg py-2 bg-white rounded-lg w-[100px] transition-opacity duration-300 right-1`}
          >
            <button
              onClick={() => {
                setShowPostMenu(false);
              }}
              type="button"
              className="w-full hover:bg-gray-100 p-2 text-sm font-medium flex items-center gap-2"
            >
              <EditIcon size="h-4 w-4" />
              Edit
            </button>
            <button
              type="button"
              className="w-full hover:bg-gray-100 p-2 flex items-center gap-2 text-sm font-medium"
              onClick={() => {
                deletePost();
                setShowPostMenu(false);
              }}
            >
              <DeleteIcon size="h-4 w-4" />
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="text-justify px-4 py-2">{content}</div>

      <div className="bg-gray-100">
        <img
          className="max-h-[300px] mx-auto"
          src="https://source.unsplash.com/random"
          alt="post-image"
        />
      </div>

      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-row-reverse items-center">
            <span className="ml-2 text-gray-500 dark:text-dark-txt">
              {likeCount || "0"} Likes
            </span>
          </div>
          <p className="text-xs uppercase tracking-widest font-medium text-gray-400 flex gap-2 items-center">
            {postType == "Announcement" ? (
              <AnncounceIcon />
            ) : (
              <LostnFoundIcon />
            )}
            {postType}
          </p>
        </div>
      </div>

      <div className="py-2 px-4">
        <div>
          <div className="flex space-x-2">
            <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-dark-txt">
              <span
                className="text-sm font-semibold flex gap-2"
                onClick={handleLike}
              >
                {!isLiked ? <LikeIcon /> : <LikeFilledIcon />}
                {!isLiked ? "Like" : "Unlike"}
              </span>
            </div>
            <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-dark-txt">
              <CommentIcon />
              <span className="text-sm font-semibold">Comment</span>
            </div>
            <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-dark-txt">
              <ShareIcon />
              <span className="text-sm font-semibold">Share</span>
            </div>
          </div>
        </div>
      </div>
      {/* END POST ACTION */}
    </div>
  );
};
