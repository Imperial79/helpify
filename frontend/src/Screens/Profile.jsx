import React from "react";

function Profile() {
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
            <h1 className="text-xl font-medium">h/user00898</h1>
            <h1 className="text-sm text-gray-500">@username</h1>
            <h1 className="text-sm text-gray-500 font-medium mt-2">Posts 10</h1>
          </div>
        </div>

        {/* List of POST below */}
        <br />
        <br />
        <p className="text-gray-600 font-medium mb-5">Your Posts</p>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
    </div>
  );
}

export default Profile;

function PostCard() {
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
        [title] Blood Donation Camp starts 22nd April
      </h2>

      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem harum
        deleniti laudantium ducimus eos earum quibusdam, provident laborum
        distinctio nobis exercitationem omnis ipsum, quasi fuga nostrum sed
        molestiae labore voluptatibus!
      </p>
    </div>
  );
}
