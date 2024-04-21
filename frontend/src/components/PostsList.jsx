import React, { useContext, useState } from "react";
import Modal from "./Modal";
import { PostComponent } from "./PostComponent";
import { Context } from "../context/ContextProvider";
import axios from "axios";

function PostsList({ posts, usersList }) {
  const { isLoading, setLoading, showAlert } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState(10);
  const [donationData, setDonationData] = useState({});

  //   ---------------------------------------------------------

  async function generateOrderId() {
    const res = await axios.post("http://localhost:8080/payment/create-order", {
      amount: donationAmount,
    });
    return res.data.response.id;
  }

  async function handleDonation(postUserID, postID) {
    if (donationAmount >= 10) {
      setLoading(true);
      const options = {
        key: "rzp_test_vs55RW4qfRA2ST",
        amount: donationAmount,
        currency: "INR",
        name: "Helpify",
        description: "",
        image: "/vite.svg",
        order_id: await generateOrderId(),
        handler: async function (response) {
          setLoading(false);
          console.log(response);
          const res = await axios.post(
            `http://localhost:8080/posts/donate/${postID}`,
            {
              amount: donationAmount,
              userID: postUserID,
            }
          );

          showAlert("Payment Successful!", false);
          setIsModalOpen(false);
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        setLoading(false);
        showAlert("Payment Failed: " + response.error.description, true);
      });
      rzp1.open();
      setLoading(false);
    } else {
      showAlert("Min. Donation is ₹10", true);
    }
  }

  //   -------------------------------------------------------------
  return (
    <div>
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
                  donation={post.donation}
                  setLoading={setLoading}
                  openDonationModal={(donationMap) => {
                    setIsModalOpen(true);
                    setDonationData(donationMap);
                  }}
                />
              </div>
            ) : (
              <></>
            );
          })
      ) : (
        <div className="flex flex-col p-10">
          <img src="/no-posts.svg" className="h-[200px] w-[200px] mx-auto" />
          <h1 className="mx-auto mt-5 font-medium text-gray-500">
            No Posts yet !
          </h1>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        toggleModal={() => {
          setIsModalOpen(!isModalOpen);
        }}
      >
        <div>
          <h1 className="font-medium text-xl mb-5">Donate</h1>
          <div className="mb-4">
            <label
              htmlFor="donate"
              className="block text-black font-medium mb-2"
            >
              Donate (Min Donation ₹10/-)
            </label>
            <input
              type="number"
              id="donate"
              name="donate"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              min="100"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              required
            />
          </div>
          {/* Save and Cancel Button */}
          <div className="flex justify-end mt-4 gap-2">
            <button
              className="bg-green-700 text-white py-2 px-10 rounded-full hover:bg-green-600 select-none"
              onClick={() => {
                handleDonation(donationData.postUserID, donationData.postID);
              }}
            >
              Donate
            </button>
            <button
              className="bg-black text-white py-2 px-4 rounded-full hover:bg-gray-700 select-none"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PostsList;
