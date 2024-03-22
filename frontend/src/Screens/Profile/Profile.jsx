import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({});
  const userID = window.localStorage.getItem('userID');
  const posts = [
    {
      id: 1,
      content: "This is my first post!",
      likes: 10,
      comments: 5,
    },
    {
      id: 2,
      content: "Just shared a new photo.",
      likes: 25,
      comments: 8,
    },
    {
      id: 3,
      content: "Had a great time at the beach!",
      likes: 18,
      comments: 3,
    },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/profile/${userID}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
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
            <p className="text-gray-600">@{user.name.toLowerCase().replaceAll(" ","")}</p>
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
          <div className="mb-6">
            <p className="text-gray-700 mb-2">Website:</p>
            <a
              href="https://example.com"
              className="text-blue-500 hover:text-blue-700"
            >
              https://example.com
            </a>
          </div>
          <div className="flex justify-center">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Edit Profile
            </button>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Posts</h3>
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-100 p-4 rounded-lg mb-4 shadow"
              >
                <p className="text-gray-700">{post.content}</p>
                <div className="flex justify-between mt-2 text-gray-600">
                  <div>
                    <span className="mr-2">{post.likes} Likes</span>
                    <span>{post.comments} Comments</span>
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
