import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  const [editedUser, setEditedUser] = useState({ ...user });

  const navigate = useNavigate();
  const userID = window.localStorage.getItem("userID");
  if (!userID) {
    navigate("/login");
  }
  const [showPostModal, setShowPostModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");

  //Add Post function
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
  
  //Edit User functions
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile Picture"
              className="rounded-full w-32 h-32"
            />
          </div>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <div className="mb-6">
            <p className="text-gray-700 mb-2">Bio:</p>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
              risus. Suspendisse lectus tortor, dignissim sit amet.
            </p>
          </div>
          <div className="mb-6">
            <p className="text-gray-700 mb-2">Location:</p>
            <p className="text-gray-600">Latitude:- {user.latitude}</p>
            <p className="text-gray-600">Longitude:- {user.longitude}</p>
          </div>

          <div className="flex justify-center">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => setShowEditUserModal(true)}>
              Edit Profile
            </button>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setShowPostModal(true)}
          >
            Create Post
          </button>
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Posts</h3>
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-gray-100 p-4 rounded-lg mb-4 shadow"
              >
                <h4 className="text-gray-900 text-2xl font-bold">
                  {post.title}
                </h4>
                <p className="text-gray-700">{post.content}</p>
                <div className="flex justify-between mt-2 text-gray-600">
                  <div>
                    {/* <span className="mr-2">{post.likes} Likes</span> */}
                    {/* <span>{post.comments} Comments</span> */}
                  </div>
                  <div>
                    <button className="text-blue-500 hover:text-blue-700">
                      Like
                    </button>
                    <button className="text-blue-500 hover:text-blue-700 ml-2">
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                    onClick={handleEditUser}
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
