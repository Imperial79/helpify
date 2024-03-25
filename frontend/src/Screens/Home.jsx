import welcomeImg from "../assets/welcome.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Scaffold from "../components/Scaffold";

function Home() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const userID = window.localStorage.getItem("userID");
  if (!userID) {
    navigate("/login");
  }
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUsers();
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/posts/`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchPosts();
  }, []);
  const userName = (users.find((user) => user._id === userID)).name.split(" ")[0]

  return (
    <Scaffold isLoading={false}>
      {/* POST FORM */}
      <div className="px-4 mt-4 shadow rounded-lg bg-white dark:bg-dark-second">
        <div className="p-2 border-b border-gray-300 dark:border-dark-third flex space-x-4">
          <img
            src="https://source.unsplash.com/random"
            alt="Profile Picture"
            className="rounded-full w-10 h-10"
          />
          <div className="flex-1 bg-gray-100 rounded-full flex items-center justify-start pl-4 cursor-pointer dark:bg-dark-third text-gray-500 text-lg dark:text-dark-txt">
            <span>What's on your mind, {userName}?</span>
          </div>
        </div>
      </div>

      {/* END POST FORM */}

      {/* LIST POST */}
      <div>
        {/* POST */}
        {posts.map((post) => {
          const currentUser = users.find((user) => user._id === post.user_id);
          return (
            <div key={post._id}>
              <PostComponent
                postID={post._id}
                currentUser={currentUser}
                title={post.title}
                content={post.content}
                likes={post.likes}
                createdAt={post.createdAt}
              />
            </div>
          );
        })}

        {/* END POST */}
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
}) => {
  const [likeCount, setLikeCount] = useState(likes.length);
  const [isLiked, setIsLiked] = useState(
    likes.includes(window.localStorage.getItem("userID"))
  );
  const userID = window.localStorage.getItem("userID");

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
    <div
              className="shadow bg-white dark:bg-dark-second dark:text-dark-txt mt-4 rounded-lg"
            >
              {/* POST AUTHOR */}
              <div className="flex items-center justify-between px-4 py-2">
                <div className="flex space-x-2 items-center">
                  <div className="relative">
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Profile Picture"
                      className="rounded-full w-20 h-20"
                    />
                  </div>
                  <div>
                  <div className="font-semibold">
                    {currentUser && currentUser.name}
                  </div>
                    <small>{postTime}</small>
                  </div>
                  
                </div>
                <div className="w-8 h-8 grid place-items-center text-xl text-gray-500 hover:bg-gray-200 dark:text-dark-txt dark:hover:bg-dark-third rounded-full cursor-pointer">
                  <i className="bx bx-dots-horizontal-rounded" />
                </div>
              </div>
              {/* END POST AUTHOR */}
              {/* POST CONTENT */}
              <div className="text-justify px-4 py-2">{content}</div>
              {/* END POST CONTENT */}
              {/* POST IMAGE */}
              {/* <div className="py-2">
            <img src="./images/post.png" alt="Post image" />
          </div> */}
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
