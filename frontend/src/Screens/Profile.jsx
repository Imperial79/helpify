import React, { useState } from "react";
import Modal from "../components/Modal";

function Profile() {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const styles = {
    ".staggered-grid": {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gridGap: "10px",
    },
    ".staggered-card:nth-child(odd)": {
      gridRowStart: "span 2",
    },
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex justify-between items-center bg-gray-50 p-5">
          <div className="flex items-center gap-5">
            <div className="rounded-full h-20 w-20 bg-gray-200 overflow-hidden">
              <img
                src="https://source.unsplash.com/random"
                alt="profile-img"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-medium">h/user00898</h1>
              <h1 className="text-sm text-gray-500">@username</h1>
              <h1 className="text-sm text-gray-500 font-medium mt-2">
                Posts 10
              </h1>
            </div>
          </div>

          <button
            type="button"
            className="border-2 rounded-lg px-5 text-sm font-medium text-blue-700"
            onClick={() => {
              setEditModalOpen(true);
            }}
          >
            Edit Profile
          </button>
        </div>

        {/* List of POST below */}
        <br />
        <br />
        <p className="text-gray-600 font-medium mb-5">Your Posts</p>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <PostCard content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam fugit dolorem magnam incidunt dicta quidem ut odio quia nemo distinctio in accusamus voluptates aperiam fuga, officiis recusandae iusto quibusdam minus." />

          <PostCard content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam fugit dolorem magnam incidunt dicta quidem ut odio quia nemo distinctio in accusamus voluptates aperiam fuga, officiis recusandae iusto quibusdam minus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam fugit dolorem magnam incidunt dicta quidem ut odio quia nemo distinctio in accusamus voluptates aperiam fuga, officiis recusandae iusto quibusdam minus." />
        </div>
      </div>
      <Modal
        isOpen={isEditModalOpen}
        toggleModal={() => {
          setEditModalOpen(!isEditModalOpen);
        }}
      ></Modal>
    </div>
  );
}

export default Profile;

function PostCard({ content }) {
  const like = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 text-gray-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
      />
    </svg>
  );

  const like_filled = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 text-gray-500"
    >
      <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
    </svg>
  );

  const comment = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 text-gray-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
      />
    </svg>
  );

  const comment_filled = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 text-gray-500"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 0 0 1.28.53l4.184-4.183a.39.39 0 0 1 .266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0 0 12 2.25ZM8.25 8.625a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm2.625 1.125a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className="bg-gray-100 rounded-xl p-5">
      <div className="w-full h-[200px] rounded-xl bg-white mb-2">
        <img
          src="https://source.unsplash.com/random"
          alt="post-index"
          className="object-contain h-full w-full"
        />
      </div>

      <h2 className="font-bold text-gray-700 mb-2">
        [title] Blood Donation Camp starts 22nd April
      </h2>

      <p className="line-clamp-3">{content}</p>

      <div className="flex items-center gap-5 mt-5">
        <button className="flex items-center mt-2 gap-2 hover:bg-gray-200 rounded-full px-2">
          {!true ? like : like_filled}
          <p className="font-medium text-gray-500">12</p>
        </button>
        <button className="flex items-center mt-2 gap-2 hover:bg-gray-200 rounded-full px-2">
          {!true ? comment : comment_filled}
          <p className="font-medium text-gray-500">12</p>
        </button>
      </div>
    </div>
  );
}
