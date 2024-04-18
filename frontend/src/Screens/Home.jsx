import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Scaffold from "../components/Scaffold";
import {
  CloseIcon,
  ImageIcon,
  LocationIcon,
  ChevronDownIcon,
  AnncounceIcon,
  MoneyIcon,
  LostnFoundIcon,
} from "../components/Icons";
import { Context } from "../context/ContextProvider";
import Modal from "../components/Modal";
import { PostComponent } from "../components/PostComponent";
import ChatUI from "../components/ChatUI";
function Home() {
  const {
    isLoading,
    setLoading,
    profileUser,
    usersList,
    posts,
    setPosts,
    userID,
  } = useContext(Context);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [showChatUI, setShowChatUI] = useState(false);

  const [activeChat, setActiveChat] = useState(null);
  return (
    <Scaffold isLoading={isLoading}>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 sm:gap-0 lg:gap-10 gap-0 mx-auto">
        <div className="col-span-3 max-w-4xl mx-auto w-full">
          <div className="p-4 rounded-lg bg-white border-2">
            <div className="p-2 flex items-center gap-5">
              <div className="circleAvatar flex-shrink-0">
                <img
                  src={
                    profileUser.avatar
                      ? `http://localhost:8080/users-images/${profileUser.avatar}`
                      : "/no-image.jpg"
                  }
                  className="object-cover h-full w-full"
                  alt={profileUser.name}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowCreatePostModal(true);
                }}
                className="text-start text-sm font-medium text-gray-600 rounded-xl bg-gray-100 p-3 w-full"
              >
                <span>🤔 What's on your mind, {profileUser.name}?</span>
              </button>
            </div>
          </div>
          <div>
            {/* <PostComponent
              postType="Fund Raiser"
              postID={1}
              // currentUser={currentUser}
              title={""}
              content={"Fund Raiser Content (Testing post)"}
              likes={[1, 2, 3]}
              createdAt={"post.createdAt"}
            />
            <PostComponent
              postType="Lost & Found"
              postID={2}
              // currentUser={currentUser}
              title={""}
              content={"Lost and Found Content (Testing post)"}
              likes={[1, 2, 3]}
              createdAt={"post.createdAt"}
            /> */}
            {posts && posts.length > 0 ? (
              posts
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((post, index) => {
                  const currentUser = usersList.find(
                    (user) => user._id === post.user_id
                  );
                  return currentUser ? (
                    <div key={index}>
                      <PostComponent
                        postID={post._id}
                        currentUser={currentUser}
                        title={post.title}
                        content={post.content}
                        likes={post.likes}
                        createdAt={post.createdAt}
                        image={post.image}
                        postType={post.postType}
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

        <div className="flex flex-col gap-2 h-[500px] col-span-1 mt-10 sm:mt-10 lg:mt-0 md:sticky md:top-[85px]">
          <div className="flex gap-2">
            <div className="bg-blue-700 rounded-full p-1 w-min">
              <LocationIcon size="h-4 w-4" color="text-white" />
            </div>
            <p className="text-sm font-medium text-gray-500">
              People in my area
            </p>
          </div>

          {showChatUI && activeChat ? (
            <ChatUI
              activeChat={activeChat}
              setActiveChat={setActiveChat}
              closeChat={() => {
                setShowChatUI(false);
              }}
            />
          ) : (
            <div className="h-full w-full rounded-xl bg-white border p-2 overflow-auto">
              {usersList.length > 1 ? (
                usersList
                  .filter((user) => user._id !== userID)
                  .map((user, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setActiveChat(user);
                          setShowChatUI(true);
                        }}
                      >
                        <OtherUsersTile userData={user} />
                      </div>
                    );
                  })
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <img src="/no_data.svg" className="h-56 p-10 mx-auto" />
                  <h1>No other users in your area yet!</h1>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create POST Modal */}
      <CreatePostModal
        showPostModal={showCreatePostModal}
        setShowPostModal={setShowCreatePostModal}
        setLoading={setLoading}
        setPosts={setPosts}
        profileUser={profileUser}
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
  profileUser,
}) {
  const [imagePreview, setImagePreview] = useState(null);
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [postType, setPostType] = useState("Announcement");
  const { showAlert, place_id, city, fetchData, posts } = useContext(Context);

  async function handlePostSubmit() {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("user_id", profileUser._id);
      formData.append("title", "");
      formData.append("content", postContent);
      formData.append("place_id", place_id);
      formData.append("postType", postType);
      if (postImage !== null) {
        formData.append("image", postImage);
      }
      const res = await axios.post(
        "http://localhost:8080/posts/create-post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!res.data.error) {
        setPosts((prevPosts) => [...prevPosts, res.data.response]);
      }

      showAlert(res.data.message, res.data.error);

      //  if the post is success then close and clear the fields
      fetchData(profileUser._id);
      setShowPostModal(false);
      setPostContent("");
      setImagePreview(null);
      setPostType("");
      setPostImage(null);
    } finally {
      setLoading(false);
    }
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
            <img
              src={
                profileUser.avatar
                  ? `http://localhost:8080/users-images/${profileUser.avatar}`
                  : "/no-image.jpg"
              }
              className="object-cover h-full w-full"
              alt={profileUser.name}
            />
          </div>
          <div>
            <h1 className="font-medium">{profileUser.name}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
              <LocationIcon size={"h-5 w-5"} color={"text-blue-700"} />
              {city}
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
            setPostImage(e.target.files[0]);
          }}
        />

        <div className="flex text-center mb-5">
          <button
            type="button"
            onClick={() => {
              setPostType("Announcement");
            }}
            className={`flex-1 gap-2 justify-center flex items-center px-5 py-2 rounded-l-full border transition-colors duration-200 ${
              postType == "Announcement"
                ? "border-blue-700 bg-blue-100"
                : "border-blue-100 bg-blue-100"
            }`}
          >
            <AnncounceIcon color="text-blue-700" />
            <p className="truncate text-sm font-medium text-blue-700 hidden md:block">
              Announcement
            </p>
          </button>
          <button
            type="button"
            onClick={() => {
              setPostType("Fund Raiser");
            }}
            className={`flex-1 gap-2 justify-center flex items-center px-5 py-2 border transition-colors duration-200 ${
              postType == "Fund Raiser"
                ? "border-green-700 bg-green-100"
                : "border-green-100 bg-green-100"
            }`}
          >
            <MoneyIcon color="text-green-700" />
            <p className="truncate text-sm font-medium text-green-700 hidden md:block">
              Fund Raiser
            </p>
          </button>
          <button
            type="button"
            onClick={() => {
              setPostType("Lost & Found");
            }}
            className={`flex-1 gap-2 justify-center flex items-center px-5 py-2 rounded-r-full border transition-colors duration-200 ${
              postType == "Lost & Found"
                ? "border-red-700 bg-red-100"
                : "border-red-100 bg-red-100"
            }`}
          >
            <LostnFoundIcon color="text-red-700" />
            <p className="truncate text-sm font-medium text-red-700 hidden md:block">
              Lost & Found
            </p>
          </button>
        </div>

        <p
          className={`${
            postType == "Announcement"
              ? "text-blue-700"
              : postType == "Fund Raiser"
              ? "text-green-700"
              : "text-red-700"
          } font-medium md:hidden lg:hidden`}
        >
          {postType}
        </p>
        {/* Post Type Dropdown */}
        {/* <div className="flex gap-1 items-center mb-5">
          <div className="relative w-full">
            <select
              name="postType"
              id="postType"
              value={postType}
              onChange={(e) => setPostType(e.target.value)}
              className="appearance-none w-full bg-gray-100 rounded-xl px-4 py-2 pr-8 focus:outline-none"
            >
              <option value="">Select Post Type</option>
              <option value="Announcement">Announcement</option>
              <option value="Fund Raiser">Fund Raiser</option>
              <option value="Lost & Found">Lost & Found</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <ChevronDownIcon size={"h-5 w-5"} color={"text-gray-500"} />
            </div>
          </div>
        </div> */}
        {/* Post Body */}
        <textarea
          name="postContent"
          id="postContent"
          rows={6}
          className="w-full p-2 bg-gray-100 rounded-xl mb-5"
          placeholder="What's on your mind?"
          value={postContent}
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
            className="bg-black text-white py-2 px-10 rounded-full hover:bg-blue-900 select-none"
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

function OtherUsersTile({ userData }) {
  return (
    <div className="w-full flex items-center gap-3 mb-2 p-2 hover:bg-gray-100 rounded-xl cursor-pointer">
      <div className="flex-shrink-0 circleAvatar">
        <img
          src={
            userData.avatar
              ? `http://localhost:8080/users-images/${userData.avatar}`
              : "/no-image.jpg"
          }
          className="object-cover h-full w-full"
          alt={userData.name}
        />
      </div>
      <div className="flex flex-col truncate">
        <h3 className="font-medium text-gray-600">{userData.name}</h3>
        <p className="font-normal text-gray-400 text-sm">{userData.email}</p>
      </div>
    </div>
  );
}
