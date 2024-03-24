import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const userID = window.localStorage.getItem("userID");

  const [showPostModal, setShowPostModal] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handlePostSubmit = () => {
    setShowPostModal(false);
    
    const createPosts = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8080/posts/create-post',{user_id: userID, title: postTitle, content: postContent}
        );
        const newPost = response.data;
        setPosts((prevPosts) => [...prevPosts, newPost]);
  
      } catch (error) {
        console.error("Error creating post:", error);
      }

      setPostContent("");
      setPostTitle("");
    };
    createPosts();
  };

  const handleEditSubmit = async () => {
    try {
      // Make a PUT request to update the user's profile
      await axios.put(`http://localhost:8080/users/edit-user/${userID}`, editedUser);

      // Update the user state with the edited data
      setUser(editedUser);
      setShowEditUserModal(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  //fetching User Data and User's Posts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/users/profile/${userID}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/posts/profile-post/${userID}`
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex items-center gap-5 bg-gray-50 p-5">
          <div className="rounded-full h-20 w-20 bg-gray-200 overflow-hidden">
            <img
              src="https://source.unsplash.com/random"
              alt="profile-img"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-medium">{user.name}</h1>
            <h1 className="text-sm text-gray-500">{user.email}</h1>
            <h1 className="text-sm text-gray-500 font-medium mt-2">Posts {posts.length}</h1>
          </div>
        </div>
        <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 my-2"
            onClick={() => setShowEditUserModal(true)}
          >
            Edit User
          </button>
        
        <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setShowPostModal(true)}
          >
            Create Post
          </button>
          {showEditUserModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">

              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editedUser.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* <div className="mb-4">
                <label htmlFor="bio" className="block text-gray-700 font-bold mb-2">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={editedUser.bio}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={editedUser.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="website" className="block text-gray-700 font-bold mb-2">
                  Website
                </label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={editedUser.website}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div> */}
          <div className="flex justify-end mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                  onClick={handleEditSubmit}
                >
                  Save
                </button>
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => setShowEditUserModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {showPostModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
                <h2 className="text-xl font-bold mb-4">Create Post</h2>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 my-2"
                  placeholder="Give a title:-"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                />
                <textarea
                  className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="What's on your mind?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                ></textarea>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                    onClick={handlePostSubmit}
                  >
                    Post
                  </button>
                  <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={() => setShowPostModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        {/* List of POST below */}
        <br />
        <br />
        <p className="text-gray-600 font-medium mb-5">Your Posts</p>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          {posts.map((post)=>{
            return (<div key={post._id}>
                <PostCard title={post.title} content={post.content}/>
            </div>)
          })}

        </div>
      </div>
    </div>
  );
}

export default Profile;

function PostCard({title,content}) {
  return (
    <div className="bg-gray-100 rounded-xl p-5">
      <div className="w-full h-[200px] rounded-xl bg-white mb-2">
        <img
          src="https://source.unsplash.com/random"
          alt="post-index"
          className="object-contain h-full w-full"
        />
      </div>

      <h2 className="font-medium text-gray-700 mb-2">
        {title}
      </h2>

      <p>
        {content}
      </p>
    </div>
  );
}
