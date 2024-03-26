import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Scaffold from "../../components/Scaffold";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [_, setCookies] = useCookies(["token"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8080/users/login", {
        email,
        password,
      });

      if (!res.data.error) {
        setCookies("token", res.data.response.token);
        window.localStorage.setItem("userID", res.data.response.user._id);
        navigate("/", { replace: true });
      } else {
        showAlert(res.data.message, true);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Scaffold isLoading={isLoading}>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 items-center justify-center">
        <div className="rounded-xl h-[200px] md:h-[300px] md:w-[300px] w-[200px] mx-auto">
          <img src="/register-hero.svg" alt="" />
        </div>
        <div className="md:p-2">
          <div className="pageTitle">Welcome back</div>
          <p className="mt-2 text-gray-500 md:text-xl text-sm mb-5">
            Enter your login credentials to get started
          </p>

          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
            <div>
              <label htmlFor="email" className="block font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="textfield"
                placeholder="Your E-mail Here ..."
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block font-semibold mb-1">
                Password
              </label>
              <div className="flex justify-center items-center gap-2">
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="textfield"
                  placeholder="Your password Here ..."
                  required
                />
                <div
                  onClick={() => {
                    setshowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 flex-shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-700 text-white py-2 px-4 rounded-full hover:bg-blue-900 w-full"
            >
              Proceed
            </button>

            <div className="flex gap-2">
              Don't have an account?
              <Link
                to="/register"
                replace
                type="button"
                className="kTextButton"
              >
                Create One
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Scaffold>
  );
};
