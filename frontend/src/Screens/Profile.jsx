import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const userID = window.localStorage.getItem("userID");
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

        {/* List of POST below */}
        <br />
        <br />
        <p className="text-gray-600 font-medium mb-5">Your Posts</p>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          {posts.map((post)=>{
            return (<>
                <PostCard key={post._id} title={post.title} content={post.content}/>
            </>)
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
