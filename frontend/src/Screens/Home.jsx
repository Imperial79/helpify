import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Scaffold from "../components/Scaffold";
import { CloseIcon, ImageIcon, LocationIcon } from "../components/Icons";
import { Context } from "../context/ContextProvider";
import Modal from "../components/Modal";
import { PostComponent } from "../components/PostComponent";
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
  return (
    <Scaffold isLoading={isLoading}>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 sm:gap-0 lg:gap-10 gap-0 mx-auto">
        <div className="col-span-3 max-w-4xl mx-auto w-full">
          <div className="p-4 rounded-lg bg-white border-2">
            <div className="p-2 flex items-center gap-5">
              <div className="h-10 w-10 overflow-hidden rounded-full flex-shrink-0">
                <img
                  src={
                    profileUser.avatar
                      ? `http://localhost:8080/users-images/${profileUser.avatar}`
                      : "https://source.unsplash.com/random"
                  }
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
            <PostComponent
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
            />
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

          <div className="h-full w-full rounded-xl bg-white border p-2 overflow-auto">
            {usersList.length > 0 ? (
              usersList
                .filter((user) => user._id !== userID)
                .map((user, index) => {
                  console.log(user)
                  return (
                    <div key={index}>
                      <OtherUsersTile userData={user} />
                    </div>
                  );
                })
            ) : (
              <div className="flex flex-col items-center justify-center">
                <img src="/no_data.svg" className="h-56 p-10 mx-auto" />
                <h1>No Users Yet!</h1>
              </div>
            )}
          </div>
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
  const { showAlert, place_id, city, fetchData, posts } = useContext(Context);

  async function handlePostSubmit() {
    console.log("postImage-> " + postImage);
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("user_id", profileUser._id);
      formData.append("title", "");
      formData.append("content", postContent);
      formData.append("place_id", place_id);
      if (postImage !== null) {
        formData.append("image", postImage);
      } else {
        // formData.append("image", ""); // or any other placeholder value
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
      console.log(res);
      if (!res.data.error) {
        console.log("Previous Posts --------------->");
        console.log(posts);
        console.log("Previous Posts end --------------->");
        setPosts((prevPosts) => [...prevPosts, res.data.response]);
      }

      showAlert(res.data.message, res.data.error);

      //  if the post is success then close and clear the fields
      fetchData(profileUser._id);
      setShowPostModal(false);
      setPostContent("");
      setImagePreview(null);
      setPostImage(null);
    } catch (error) {
      console.error("Error creating post:", error);
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
                  : "https://source.unsplash.com/random"
              }
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

function OtherUsersTile({ userData }) {
  return (
    <div className="w-full flex items-center gap-3 mb-2 p-2 hover:bg-gray-100 rounded-xl cursor-pointer">
      <div className="flex-shrink-0 circleAvatar">
        <img
          src={
            userData.avatar
              ? `http://localhost:8080/users-images/${userData.avatar}`
              : "https://source.unsplash.com/random"
          }
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
