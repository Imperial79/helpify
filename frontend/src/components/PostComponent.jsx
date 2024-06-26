import { useContext, useState } from "react";
import { Context } from "../context/ContextProvider";
import { Link } from "react-router-dom";
import LinearProgress from "@mui/joy/LinearProgress";
import useRazorpay from "react-razorpay";
import {
  AnncounceIcon,
  CommentIcon,
  CommentFilledIcon,
  DeleteIcon,
  EditIcon,
  LikeFilledIcon,
  LikeIcon,
  LostnFoundIcon,
  MenuIcon,
  ShareIcon,
  MoneyIcon,
} from "./Icons";
import axios from "axios";
import { CommentComponent } from "./CommentComponent";

export const PostComponent = ({
  postID,
  content,
  likes,
  currentUser,
  createdAt,
  image,
  postType,
  donation,
  openDonationModal,
}) => {
  const { userID, setPosts, posts, showAlert } = useContext(Context);
  const [showPostMenu, setShowPostMenu] = useState(false);
  const [showCommentComponent, setShowCommentComponent] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [updatedDonationData, setUpdatedDonationData] = useState(donation);
  const [donationAmount, setDonationAmount] = useState(10);
  const [donationPercentage, setDonationPercentage] = useState(
    Math.round((donation.amount / donation.target) * 100)
  );
  const [Razorpay, isLoaded] = useRazorpay();

  // var rzrpay = new Razorpay({
  //   key_id: "rzp_test_vs55RW4qfRA2ST",
  //   key_secret: "LiQWHDUJVBd9MJC1saAHWdae",
  // });

  //   ----------------------------------------------------

  async function deletePost(postID) {
    try {
      const res = await axios.delete(`http://localhost:8080/posts/${postID}`);
      // Remove the deleted post from the posts state
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postID));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  const handleLike = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/posts/${postID}/like`,
        { userID: userID }
      );

      if (!res.data.error) {
        const newPosts = [...posts];
        const index = newPosts.findIndex((post) => post._id == postID);
        newPosts[index].likes = res.data.response.likes;

        setPosts(newPosts);
      }
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  const handleShowCommentComponent = () => {
    setShowCommentComponent(!showCommentComponent);
  };

  function formatDateTime(timeString) {
    const date = new Date(timeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }
  const postTime = formatDateTime(createdAt);

  return (
    <div
      className={`border-2 bg-white mt-4 rounded-lg ${
        postType == "Lost & Found" ? "border-red-200 bg-red-100" : ""
      }`}
    >
      {/* POST AUTHOR */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex space-x-2 items-center gap-2">
          <div className="circleAvatar flex-shrink-0">
            <Link to={`/profile/${currentUser && currentUser._id}`}>
              <img
                src={
                  currentUser &&
                  (currentUser.avatar
                    ? `http://localhost:8080/users-images/${currentUser.avatar}`
                    : "/no-image.jpg")
                }
                className="h-full w-full object-cover"
                alt={currentUser && currentUser.name}
              />
            </Link>
          </div>
          <div>
            <div className="font-semibold">
              <Link to={`/profile/${currentUser && currentUser._id}`}>
                {currentUser && currentUser.name}
              </Link>
            </div>
            <small>{postTime}</small>
          </div>
        </div>

        <div className="relative">
          {currentUser && currentUser._id === userID && (
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
            {/* <button
              onClick={() => {
                setShowPostMenu(false);
              }}
              type="button"
              className="w-full hover:bg-gray-100 p-2 text-sm font-medium flex items-center gap-2"
            >
              <EditIcon size="h-4 w-4" />
              Edit
            </button> */}
            <button
              type="button"
              className="w-full hover:bg-gray-100 p-2 flex items-center gap-2 text-sm font-medium"
              onClick={() => {
                deletePost(postID);
                setShowPostMenu(false);
              }}
            >
              <DeleteIcon size="h-4 w-4" />
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="text-justify px-4 py-2">{content}</div>

      {image !== "" ? (
        <div className="bg-gray-100">
          <img
            className="max-h-[300px] mx-auto"
            src={`http://localhost:8080/post-images/${image}`}
            alt="post-image"
          />
        </div>
      ) : (
        <></>
      )}

      {/* For fund raiser */}
      {postType == "Fund Raiser" ? (
        <FundRaiserComponent
          postID={postID}
          postUserID={currentUser._id}
          donation={donation}
          donationPercentage={donationPercentage}
          openDonationModal={openDonationModal}
        />
      ) : (
        <></>
      )}
      {/* end */}

      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-row-reverse items-center">
            <span className="ml-2 text-gray-500 dark:text-dark-txt">
              {/* {likeCount || "0"} Likes */}
              {likes.length} Likes
            </span>
          </div>
          <div
            className={`text-xs uppercase tracking-widest font-medium flex gap-2 items-center truncate ${
              postType == "Announcement"
                ? "text-blue-700"
                : postType == "Lost & Found"
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {postType == "Announcement" ? (
              <AnncounceIcon />
            ) : postType == "Lost & Found" ? (
              <LostnFoundIcon />
            ) : (
              <MoneyIcon />
            )}
            <p>{postType}</p>
          </div>
        </div>
      </div>

      <div className="py-2 px-4">
        <div>
          <div className="flex justify-evenly">
            <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-dark-txt">
              <span
                className="text-sm font-semibold flex gap-2"
                onClick={handleLike}
              >
                {!likes.includes(userID) ? <LikeIcon /> : <LikeFilledIcon />}
                {!likes.includes(userID) ? "Like" : "Unlike"}
              </span>
            </div>
            <div
              className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-dark-txt"
              onClick={handleShowCommentComponent}
            >
              {showCommentComponent ? (
                <>
                  <CommentFilledIcon />
                </>
              ) : (
                <>
                  <CommentIcon postID={postID} />
                </>
              )}
              <span className="text-sm font-semibold">Comment</span>
            </div>
            {/* <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-dark-txt">
              <ShareIcon />
              <span className="text-sm font-semibold">Share</span>
            </div> */}
          </div>
        </div>
      </div>

      {showCommentComponent && (
        <CommentComponent postID={postID} userID={userID}/>
      )}
    </div>
  );
};

function FundRaiserComponent({
  donation,
  postUserID,
  postID,
  donationPercentage,
  openDonationModal,
}) {
  return (
    <div className="p-5 flex items-center gap-10">
      <div className="w-full">
        <div className="flex justify-between mb-2">
          <p className="font-medium text-gray-700 text-lg">
            ₹{donation.amount}
          </p>
          <p className="font-bold text-green-500 text-lg">₹{donation.target}</p>
        </div>
        <LinearProgress
          thickness={10}
          value={donationPercentage && donationPercentage}
          determinate
        />
      </div>
      <button
        type="button"
        className="kButton"
        onClick={() => {
          openDonationModal({
            postID: postID,
            postUserID: postUserID,
          });
        }}
        disabled={
          donationPercentage && donationPercentage === 100 ? true : false
        }
      >
        Donate
      </button>
    </div>
  );
}
