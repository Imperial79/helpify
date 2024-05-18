import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../context/ContextProvider";
import { AnimatePresence, motion } from "framer-motion";

const ForgotPassword = ({ setShowforgotPwdModal }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const { showAlert } = useContext(Context);
  const [canResendOTP, setCanResendOTP] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleEmailSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/users/forgot-password",
        { email }
      );
      console.log(res);
      if (!res.data.error) {
        setStep(2);
      } else {
        showAlert(res.data.message, true);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleResendOTP = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/users/forgot-password",
        { email }
      );
      console.log(res);
      if (!res.data.error) {
        setTimer(60); // Reset the timer to 60 seconds
        setCanResendOTP(false);
      } else {
        showAlert(res.data.message, true);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleOtpSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8080/users/verify-otp", {
        email,
        otp,
      });
      if (!res.data.error) {
        setStep(3);
      } else {
        showAlert(res.data.message, true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetPassword = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/users/reset-password",
        {
          email,
          newPassword,
        }
      );
      console.log(res);
      if (!res.data.error) {
        showAlert(res.data.message, res.data.error);
        setStep(1);
        setEmail("");
        setShowforgotPwdModal(false);
      } else {
        showAlert(res.data.message, true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setOtp("");
      setNewPassword("");
    }
  };
  useEffect(() => {
    let interval;

    if (step === 2) {
      setTimer(10);
      setCanResendOTP(false);

      interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer - 1;
          if (newTimer === 0) {
            setCanResendOTP(true);
          }
          return newTimer;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [step]);
  return (
    <div>
      <AnimatePresence>
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white mx-2 py-2 px-10 rounded-full select-none"
              onClick={handleEmailSubmit}
              disabled={email.length === 0}
            >
              Send OTP
            </button>
            <button
              className="bg-black text-white py-2 px-10 ml-4 rounded-full hover:bg-blue-900 select-none"
              onClick={() => {
                setShowforgotPwdModal(false);
                setStep(1);
                setOtp("");
                setEmail("");
              }}
            >
              Cancel
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="otp"
              >
                OTP
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="otp"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            {canResendOTP ? (
              <div>
                <button
                  type="button"
                  className="kTextButton mb-4 ml-1"
                  onClick={handleResendOTP}
                >
                  Resend OTP
                </button>
              </div>
            ) : (
              <div className="text-gray-700 font-bold mb-2 ml-1">
                Resend OTP in {timer} seconds
              </div>
            )}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-10 rounded-full select-none"
              onClick={handleOtpSubmit}
            >
              Verify OTP
            </button>
            <button
              className="bg-black text-white py-2 px-10 ml-4 rounded-full hover:bg-blue-900 select-none"
              onClick={() => {
                setShowforgotPwdModal(false);
                setStep(1);
                setOtp("");
                setEmail("");
              }}
            >
              Cancel
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="newPassword"
              >
                New Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-10 rounded-full select-none"
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
            <button
              className="bg-black text-white py-2 px-10 ml-4 rounded-full hover:bg-blue-900 select-none"
              onClick={() => {
                setShowforgotPwdModal(false);
                setStep(1);
                setOtp("");
                setEmail("");
              }}
            >
              Cancel
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ForgotPassword;
