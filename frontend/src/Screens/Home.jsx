import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Scaffold from "../components/Scaffold";
import { MenuIcon } from "../components/Icons";
import { Context } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";

function Home() {
  const { userId } = useContext(Context);
  const [usersList, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/users/`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/posts/`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
    fetchPosts();
  }, []);
<<<<<<< HEAD
  const deletePost = async (postID) => {
    try {
      await axios.delete(`http://localhost:8080/posts/${postID}`);
      // Remove the deleted post from the posts state
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postID));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
=======
>>>>>>> eafd92c0de32690efa4357306b592a44d99b257f

  // const userName = users?(users.find((user) => user._id === userID)).name.split(" ")[0]:"";
  return (
    <Scaffold isLoading={isLoading}>
      {/* POST FORM */}

      <div className="p-4 mt-4 rounded-lg bg-white dark:bg-dark-second">
        <div className="p-2 flex items-center gap-2">
          <img
            src="https://source.unsplash.com/random"
            alt="Profile Picture"
            className="rounded-full w-10 h-10"
          />
<<<<<<< HEAD
          <div className="flex-1 bg-gray-100 rounded-full flex items-center justify-start pl-4 cursor-pointer dark:bg-dark-third text-gray-500 text-lg dark:text-dark-txt">
            <span>What's on your mind, {"SomeUserName"}?</span>
=======
          <div className="bg-gray-100 p-4 rounded-lg text-gray-400 font-medium text-sm truncate w-full">
            <span>🤔💭 What's on your mind, {userId}?</span>
>>>>>>> eafd92c0de32690efa4357306b592a44d99b257f
          </div>
        </div>
      </div>

      {/* END POST FORM */}

      {/* LIST POST */}
      <div>
        {/* POST */}
        {posts
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((post) => {
            const currentUser = usersList.find(
              (user) => user._id === post.user_id
            );
            return (
              <div key={post._id}>
                <PostComponent
                  postID={post._id}
                  currentUser={currentUser}
                  title={post.title}
                  content={post.content}
                  likes={post.likes}
                  createdAt={post.createdAt}
                  onDelete={deletePost}
                  />
              </div>
            );
          })}
      </div>
    </Scaffold>
  );
}

export default Home;

const PostComponent = ({
  postID,
  title,
  content,
  likes,
  currentUser,
  createdAt,
  onDelete
}) => {
  const [showPostMenu, setShowPostMenu] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const { userId } = useContext(Context);
  const [isLiked, setIsLiked] = useState(likes.includes(userId));

  const handleLike = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/posts/${postID}/like`,
        { userID: userId }
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
  const handleDelete = async () => {
    try {
      await onDelete(postID);
      console.log('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  return (
    <div className="shadow bg-white dark:bg-dark-second dark:text-dark-txt mt-4 rounded-lg">
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
<<<<<<< HEAD
          {currentUser._id === userID && (
=======
          {
>>>>>>> eafd92c0de32690efa4357306b592a44d99b257f
            <button
              onClick={() => {
                setShowPostMenu(!showPostMenu);
              }}
              className="hover:bg-gray-200 bg-gray-100 rounded-full p-2"
            >
              <MenuIcon size={"h-6 w-6"} />
            </button>
          }

          <div
            className={`${
              showPostMenu ? "opacity-100" : "opacity-0 pointer-events-none"
            } absolute shadow-lg py-2 bg-white rounded-lg w-[100px] transition-opacity duration-300 right-1`}
          >
            <button
              type="button"
              className="w-full hover:bg-gray-100 p-2 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              Edit
            </button>
            <button
              type="button"
              className="w-full hover:bg-gray-100 p-2 flex items-center gap-2"
              onClick={handleDelete}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
      {/* END POST AUTHOR */}
      {/* POST CONTENT */}
      <div className="text-justify px-4 py-2">{content}</div>
      {/* END POST CONTENT */}
      {/* POST IMAGE */}
      <div className="py-2">
        {/* <img
          className="h-64 w-64 mx-auto"
          src="https://source.unsplash.com/random"
          alt="Post image"
        /> */}
      </div>
      {/* END POST IMAGE */}
      {/* POST REACT */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-row-reverse items-center">
            <span className="ml-2 text-gray-500 dark:text-dark-txt">
              Likes: {likeCount}
            </span>
            <span className="rounded-full grid place-items-center text-2xl -ml-1 text-red-800">
              <i className="bx bxs-angry" />
            </span>
            <span className="rounded-full grid place-items-center text-2xl -ml-1 text-red-500">
              <i className="bx bxs-heart-circle" />
            </span>
            <span className="rounded-full grid place-items-center text-2xl -ml-1 text-yellow-500">
              <i className="bx bx-happy-alt" />
            </span>
          </div>
        </div>
      </div>
      {/* END POST REACT */}
      {/* POST ACTION */}
      <div className="py-2 px-4">
        <div className="border border-gray-200 dark:border-dark-third border-l-0 border-r-0 py-1">
          <div className="flex space-x-2">
            <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-dark-txt">
              <i className="bx bx-like" />
              <span className="text-sm font-semibold" onClick={handleLike}>
                {isLiked ? "Unlike" : "Like"}
              </span>
            </div>
            <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-dark-txt">
              <i className="bx bx-comment" />
              <span className="text-sm font-semibold">Comment</span>
            </div>
            <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-dark-txt">
              <i className="bx bx-share bx-flip-horizontal" />
              <span className="text-sm font-semibold">Share</span>
            </div>
          </div>
        </div>
      </div>
      {/* END POST ACTION */}
    </div>
  );
};
