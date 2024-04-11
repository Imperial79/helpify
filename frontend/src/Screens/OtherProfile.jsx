import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Modal from "../components/Modal";
import {
  LocationIcon,
  ImageIcon,
  CloseIcon,
  LikeIcon,
  LikeFilledIcon,
  CommentIcon,
  CommentFilledIcon,
} from "../components/Icons";
import Scaffold from "../components/Scaffold";
import { Context } from "../context/ContextProvider";
import FullScreenLoading from "../components/FullScrenLoading";

function OtherProfile() {
  const [isLoading, setLoading] = useState(false);
  const [otherProfile, setOtherProfile] = useState([]);
  const [otherPosts, setOtherPosts] = useState({});
  const navigate = useNavigate();
  const { profileID } = useParams();
  const userID = window.localStorage.getItem("userID");
  if (userID === profileID) {
    navigate("/profile");
  }
  useEffect(() => {
    const getOtherProfile = async (profileID) => {
      try {
        setLoading(true);
        const [usersResponse, postsResponse] = await Promise.all([
          axios.get(`http://localhost:8080/users/profile/${profileID}`),
          axios.get(`http://localhost:8080/posts/profile-post/${profileID}`),
        ]);
        setOtherProfile(usersResponse.data);
        setOtherPosts(postsResponse.data);
      } finally {
        setLoading(false);
      }
    };
    getOtherProfile(profileID);
  }, []);
  return otherProfile != null ? (
    <Scaffold isLoading={isLoading}>
      <div>
        {/* Profile */}
        <div className="flex flex-col">
          <div className="md:flex items-center md:gap-5 gap-5 bg-gray-50 p-5 justify-between">
            <div className="flex items-center gap-5">
              <div className="flex flex-col items-center gap-1">
                <div className="rounded-full md:h-20 md:w-20 h-10 w-10 bg-gray-200 overflow-hidden flex-shrink-0 relative">
                  <img
                    src={
                      otherProfile.avatar
                        ? `http://localhost:8080/users-images/${otherProfile.avatar}`
                        : "https://source.unsplash.com/random"
                    }
                    alt={otherProfile.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col truncate">
                <h1 className="md:text-xl text-sm font-medium">
                  {otherProfile.name}
                </h1>
                <h1 className="text-[15px] sm:text-lg md:text-lg text-gray-500">
                  {otherProfile.email}
                </h1>
                <h1 className="text-sm text-gray-500 font-medium mt-2">
                  Posts {otherPosts.length}
                </h1>
              </div>
            </div>
          </div>

          {/* List of POST below */}
          <br />
          <br />
          <p className="text-gray-600 font-medium mb-5">
            {otherProfile.name}'s Posts
          </p>

          {otherPosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-5">
              {otherPosts
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((post) => {
                  return (
                    <div key={post._id}>
                      <PostCard postData={post} />
                    </div>
                  );
                })}
            </div>
          ) : (
            <img src="/no_data.svg" alt="no-data" className="h-64 md:h-72" />
          )}
        </div>
      </div>
    </Scaffold>
  ) : (
    <FullScreenLoading isLoading={!user} />
  );
}

export default OtherProfile;

function PostCard({ postData }) {
  return (
    <div className="bg-white border rounded-xl">
      <div className="w-full h-[200px] bg-gray-100 mb-2">
        <img
          src={
            postData.image !== ""
              ? `http://localhost:8080/post-images/${postData.image}`
              : "https://source.unsplash.com/random"
          }
          alt="post-index"
          className="object-contain h-full w-full"
        />
      </div>

      <div className="p-2">
        <h2 className="font-bold text-gray-700 mb-2">{postData.title}</h2>

        <p className="line-clamp-3">{postData.content}</p>

        <div className="flex items-center gap-5 mt-2">
          <button className="flex items-center mt-2 gap-2 hover:bg-gray-200 rounded-full px-2">
            {!true ? (
              <LikeIcon color="text-gray-500" />
            ) : (
              <LikeFilledIcon color="text-gray-500" />
            )}

            <p className="font-medium text-gray-500">
              {(postData.likes && postData.likes.length) || "0"}
            </p>
          </button>
          {/* <button className="flex items-center mt-2 gap-2 hover:bg-gray-200 rounded-full px-2">
            {!true ? (
              <CommentIcon color="text-gray-500" />
            ) : (
              <CommentFilledIcon color="text-gray-500" />
            )}
            <p className="font-medium text-gray-500">12</p>
          </button> */}
        </div>
      </div>
    </div>
  );
}
