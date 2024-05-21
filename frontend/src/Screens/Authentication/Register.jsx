import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useGeolocated } from "react-geolocated";
import { Link, useNavigate } from "react-router-dom";
import Scaffold from "../../components/Scaffold";
import { Context } from "../../context/ContextProvider";

export const Register = () => {
  const { showAlert, userID } = useContext(Context);
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [city, setCity] = useState("");
  const [place_id, setPlaceID] = useState("");
  const [addressList, setAddressList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  if (userID) {
    navigate("/");
  }
  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    setPasswordValid(passwordRegex.test(passwordValue));
  };
  const showPasswordRequirementsPopup = () => {
    setShowPasswordRequirements(true);
    setTimeout(() => {
      setShowPasswordRequirements(false);
    }, 3000);
  };
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  const handleGetLocation = async () => {
    if (coords) {
      if (isGeolocationAvailable) {
        if (isGeolocationEnabled) {
          setLoading(true);
          setLatitude(coords.latitude);
          setLongitude(coords.longitude);

          // var res = await axios.get(
          //   `https://api.maptiler.com/geocoding/${coords.longitude},${coords.latitude}.json?key=${import.meta.env.VITE_MAPTILER_API}`
          // );

          const options = {
            method: "GET",
            url: "https://trueway-geocoding.p.rapidapi.com/ReverseGeocode",
            params: {
              location: `${coords.latitude},${coords.longitude}`,
              language: "en",
            },
            headers: {
              "X-RapidAPI-Key":
                "a18010f01cmshaea7be3e2bb831ep146244jsnd20f6687f9aa",
              "X-RapidAPI-Host": "trueway-geocoding.p.rapidapi.com",
            },
          };

          try {
          } catch (error) {
            console.error(error);
          }

          var res2 = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
              coords.latitude
            },${coords.longitude}&key=${import.meta.env.VITE_GMAPS_API}`
          );

          res2.data.results.map((_, index) => {
            setAddressList(res2.data.results);
          });

          // ------------ For checking if I am inside a bound or not

          //   if (your_latitude > SW_latitude and your_latitude < NE_latitude and
          //     your_longitude > SW_longitude and your_longitude < NE_longitude):
          //   print("Your point is inside the bounds!")
          // else:
          //   print("Your point is outside the bounds.")
          // console.log(res2);

          // -----------------------------
          // console.log(
          //   res2.data.results.filter(
          //     (result) => result.types[0] === "administrative_area_level_4"
          //   )
          // );
          const locationData = res2.data.results.filter(
            (result) => result.types[0] === "administrative_area_level_4"
          );
          if (locationData.length != 0) {
            setPlaceID(locationData[0].place_id);
            setCity(
              locationData[0].address_components.filter(
                (result) => result.types[0] === "administrative_area_level_4"
              )[0].long_name
            );
          }
          setLoading(false);
        } else {
          console.error("Geolocation is not enabled.");
        }
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }
  };
  const handleVerifyEmail = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8080/users/verifyEmail", {
        email,
      });

      if (res.data.error) {
        showAlert(res.data.message, true);
      } else {
        showAlert("OTP sent to your email.", false);
        setShowOTPInput(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerification = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/users/verify-otp",
        { email, otp }
      );
      if (!response.data.error) {
        showAlert("Email verified successfully.", false);
        setShowOTPInput(false);
        setOtp("");
        setEmailVerified(true);
      } else {
        showAlert(response.data.message, true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (latitude && longitude) {
        setLoading(true);
        const res = await axios.post("http://localhost:8080/users/register", {
          name,
          email,
          password,
          latitude,
          longitude,
          city,
          place_id,
        });

        if (!res.data.error) {
          await handleVerifyEmail();
          navigate("/login", { replace: true });
        }

        showAlert(res.data.message, res.data.error);
      } else {
        showAlert("Please allow location / Get location to continue", true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Scaffold isLoading={isLoading}>
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-5 items-center">
        <div className="rounded-xl h-[200px] md:h-[300px] md:w-[300px] w-[200px] mx-auto">
          <img src="/register-hero.svg" alt="" />
        </div>
        <div className="p-2">
          <div className="pageTitle">Create an account</div>
          <p className="mt-1 text-gray-500 md:text-xl text-sm mb-5">
            Enter your details below to create an account
          </p>
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
            <div>
              <label htmlFor="name" className="block font-semibold mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Eg. John Doe"
                className="textfield"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-semibold mb-1">
                E-mail
              </label>
              <div className="flex items-center">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="textfield w-3/4 p-1 mr-2" // Reduced width and added right margin
                  placeholder="Eg. johndoe@mail.com"
                  required
                />
                <button
                  type="button"
                  onClick={handleVerifyEmail}
                  className="kTextButton"
                >
                  Verify
                </button>
              </div>
            </div>

            {showOTPInput && (
              <div>
                <label htmlFor="otp" className="block font-semibold mb-1">
                  OTP
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="textfield w-3/4 p-1 mr-2"
                    placeholder="Enter OTP"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleOTPVerification}
                    className="kTextButton"
                  >
                    Verify OTP
                  </button>
                </div>
              </div>
            )}
            <div>
              <label htmlFor="password" className="block font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                onFocus={showPasswordRequirementsPopup}
                className={`textfield ${
                  passwordValid
                    ? "border-solid border-2 border-green-600"
                    : "border-solid border-2 border-red-600"
                }`}
                placeholder="Your password here ..."
                required
              />
              <div
                className={`password-requirements-popup ${
                  showPasswordRequirements ? "show" : ""
                }`}
              >
                At least 8 characters, one uppercase letter, one lowercase
                letter, one digit, and one special character
              </div>
            </div>
            {/* list of locality */}
            {/* {addressList &&
              addressList.map((data, index) =>
                data.types.includes("sublocality") ? (
                  <li key={index} className="flex flex-col gap-2">
                    <div>{data.formatted_address}</div>
                  </li>
                ) : (
                  <></>
                )
              )} */}
            {/* list of locality ends */}

            {addressList &&
              addressList.map((data, index) =>
                data.types[0] == "administrative_area_level_4" ? (
                  <li key={index} className="flex flex-col gap-2">
                    <div>Your Location: {data.formatted_address}</div>
                    {/* <div>
                      <p>
                        NorthEast - {data.geometry.bounds.northeast.lat},{" "}
                        {data.geometry.bounds.northeast.lng}
                      </p>
                      <p>
                        Southwest - {data.geometry.bounds.southwest.lat},{" "}
                        {data.geometry.bounds.southwest.lng}
                      </p>
                    </div> */}
                  </li>
                ) : (
                  <></>
                )
              )}

            {latitude && longitude ? (
              <>
                <p>Lat: {latitude}</p>
                <p>Long: {longitude}</p>
              </>
            ) : (
              <></>
            )}

            <button
              type="button"
              onClick={handleGetLocation}
              className="kTextButton"
            >
              Get My Location
            </button>
            <button
              type="submit"
              className="kButton w-full"
              disabled={!emailVerified || !passwordValid}
            >
              Create Account
            </button>

            <div className="flex gap-2">
              Already have an account?
              <Link to="/login" replace type="button" className="kTextButton">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Scaffold>
  );
};
