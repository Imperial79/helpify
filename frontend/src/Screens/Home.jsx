import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Scaffold from "../components/Scaffold";
import {
  CloseIcon,
  CommentIcon,
  DeleteIcon,
  EditIcon,
  ImageIcon,
  LikeFilledIcon,
  LikeIcon,
  LocationIcon,
  MenuIcon,
  ShareIcon,
} from "../components/Icons";
import { Context } from "../context/ContextProvider";
import Modal from "../components/Modal";
function Home() {
  const {
    usersList,
    setUsers,
    posts,
    setPosts,
    isLoading,
    setLoading,
    userID,
  } = useContext(Context);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  const deletePost = async (postID) => {
    try {
      await axios.delete(`http://localhost:8080/posts/${postID}`);
      // Remove the deleted post from the posts state
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postID));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // const userName = usersList? (usersList.find((user) => user._id === userID).name.split(" ")[0]) :'userName';
  // console.log(userName);
  return (
    <Scaffold isLoading={isLoading}>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 sm:gap-0 lg:gap-10 gap-0 mx-auto">
        <div className="col-span-3 max-w-4xl mx-auto w-full">
          <div className="p-4 rounded-lg bg-white border-2">
            <div className="p-2 flex items-center gap-5">
              <div className="h-10 w-10 overflow-hidden rounded-full flex-shrink-0">
                <img
                  src="https://source.unsplash.com/random"
                  alt="profile-img"
                  className="h-full w-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowCreatePostModal(true);
                }}
                className="text-start text-sm font-medium text-gray-600 rounded-xl bg-gray-100 p-3 w-full"
              >
                <span>🤔 What's on your mind, {"userName"}?</span>
              </button>
            </div>
          </div>
          <div>
            {posts && posts.length > 0 ? (
              posts
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((post) => {
                  const currentUser = usersList.find(
                    (user) => user._id === post.user_id
                  );
                  return currentUser ? (
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
                  ) : (
                    <></>
                  );
                })
            ) : (
              <div className="flex flex-col p-10">
                <img
                  src="/no-posts.svg"
                  className="h-[200px] w-[200px] mx-auto"
                />
                <h1 className="mx-auto mt-5 font-medium text-gray-500">
                  No Posts yet !
                </h1>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 h-[500px] col-span-1 mt-10 sm:mt-10 lg:mt-0">
          <h1>People in my area</h1>
          <div className="h-full w-full rounded-xl bg-white border p-5 overflow-auto">
            <div className="w-full flex items-center gap-3">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200"></div>
              <div className="flex flex-col truncate">
                <h3 className="font-medium text-gray-600">Avishek verma</h3>
                <p className="font-normal text-gray-400 text-sm">
                  avishekverma79@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create POST Modal */}
      <CreatePostModal
        showPostModal={showCreatePostModal}
        setShowPostModal={setShowCreatePostModal}
        setLoading={setLoading}
        setPosts={setPosts}
      />
    </Scaffold>
  );
}

export default Home;

function CreatePostModal({
  showPostModal,
  setShowPostModal,
  setLoading,
  setPosts,
}) {
  const [imagePreview, setImagePreview] = useState(null);
  const [postContent, setPostContent] = useState("");
  const { userID, showAlert } = useContext(Context);

  function handlePostSubmit() {
    setShowPostModal(false);

    const createPosts = async () => {
      try {
        setLoading(true);

        const res = await axios.post(
          "http://localhost:8080/posts/create-post",
          { user_id: userID, title: "", content: postContent }
        );

        if (!res.data.error) {
          setPosts((prevPosts) => [...prevPosts, res.data.response]);
        }
        showAlert(res.data.message, res.data.error);
      } catch (error) {
        console.error("Error creating post:", error);
      } finally {
        setLoading(false);
      }

      setPostContent("");
      setImagePreview(null);
    };
    createPosts();
  }
  return (
    <Modal
      isOpen={showPostModal}
      toggleModal={() => {
        setShowPostModal(!showPostModal);
      }}
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          <h1 className="font-medium text-xl">Create Post</h1>
        </div>
        <div className="flex gap-2 items-center mb-5">
          <div className="circleAvatar bg-gray-100">
            <img src="https://source.unsplash.com/random" alt="" />
          </div>
          <div>
            <h1 className="font-medium">username</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
              <LocationIcon size={"h-5 w-5"} color={"text-blue-700"} />
              Durgapur, West Bengal
            </div>
          </div>
        </div>
        {/* Add Image */}
        {imagePreview == null ? (
          <button
            onClick={() => {
              document.getElementById("postImagePicker").click();
            }}
            className="w-full rounded-xl mb-5 flex items-center gap-2 bg-gray-100 p-2 justify-center hover:bg-gray-200"
          >
            <ImageIcon size={"h-5 w-5"} color={"text-gray-500"} />
            <h1 className="font-medium text-gray-500">Add Image</h1>
          </button>
        ) : (
          <div className="w-full rounded-xl h-[200px] overflow-hidden relative mb-5">
            <img
              src={imagePreview}
              alt="picked-image"
              className="h-full w-full object-contain"
            />
            <button
              type="button"
              onClick={() => {
                setImagePreview(null);
              }}
              className="absolute rounded-full h-7 w-7 bg-black right-[10px] top-[10px] flex justify-center items-center"
            >
              <CloseIcon color={"text-white object-contain mx-auto"} />
            </button>
          </div>
        )}
        <input
          type="file"
          id="postImagePicker"
          className="hidden"
          accept=".jpeg, .jpg, .png, .webp"
          onChange={(e) => {
            setImagePreview(URL.createObjectURL(e.target.files[0]));
          }}
        />

        {/* Post Body */}
        <textarea
          name="postContent"
          id="postContent"
          rows={6}
          className="w-full p-2 bg-gray-100 rounded-xl mb-5"
          placeholder="What's on your mind?"
          onChange={(e) => {
            setPostContent(e.target.value);
          }}
        ></textarea>
        {/* Create Post Button and Cancel Button */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handlePostSubmit}
            className="kButton w-full"
          >
            Create Post
          </button>
          <button
            className="min-w-[200px] bg-black rounded-full text-white hover:bg-gray-700"
            onClick={() => {
              setShowPostModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

const PostComponent = ({
  postID,
  title,
  content,
  likes,
  currentUser,
  createdAt,
  onDelete,
}) => {
  const [showPostMenu, setShowPostMenu] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const { userID } = useContext(Context);
  const [isLiked, setIsLiked] = useState(likes.includes(userID));

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
  const handleDelete = async () => {
    try {
      await onDelete(postID);
      console.log("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
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
              type="button"
              className="w-full hover:bg-gray-100 p-2 text-sm font-medium flex items-center gap-2"
            >
              <EditIcon size="h-4 w-4" />
              Edit
            </button>
            <button
              type="button"
              className="w-full hover:bg-gray-100 p-2 flex items-center gap-2 text-sm font-medium"
              onClick={handleDelete}
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

      <div className="py-2 px-4">
        <div>
          <div className="flex space-x-2">
            <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-dark-txt">
              <i className="bx bx-like" />
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
