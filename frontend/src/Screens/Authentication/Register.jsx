import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGeolocated } from "react-geolocated";
import dotenv from "dotenv";

dotenv.config();

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [addressList, setAddressList] = useState([]);
  console.log(process.env.GMAPS_API);
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
          setLatitude(coords.latitude);
          setLongitude(coords.longitude);
          // var res1 = await axios.get(
          //   `https://geokeo.com/geocode/v1/reverse.php?lat=${coords.latitude}&lng=${coords.longitude}&api=ce3d5ebc5bde05ab840e4189d41ea6ea`
          // );
          // console.log("first");
          // console.log(res1);

          // var res2 = await axios.get(
          //   `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}&zoom=18&addressdetails=1`
          // );
          // setDisplayAddress(res2.data.display_name);
          var res2 = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${process.env.REACT_APP_GMAPS_API}`
          );
          // setDisplayAddress(res2.data.display_name);
          res2.data.results.map((_, index) => {
            // console.log(res2.data.results[index].formatted_address);
            setAddressList(res2.data.results);
          });

          console.log(res2);
        } else {
          console.error("Geolocation is not enabled.");
        }
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }
  };

  useEffect(() => {
    handleGetLocation();
  }, [coords]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Registration data:", {
      name,
      email,
      password,
      latitude,
      longitude,
    });
    try {
      await axios.post("http://localhost:8080/users/register", {
        name,
        email,
        password,
        latitude,
        longitude,
      });
      alert("registered");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="pageTitle">Create an account</div>
      <p className="mt-2 text-gray-500 md:text-xl text-sm mb-5">
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
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="textfield"
            placeholder="Eg. johndoe@mail.com"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-semibold mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="textfield"
            placeholder="Your password here ..."
            required
          />
        </div>

        {addressList &&
          addressList.map((data, index) =>
            data.types[0] == "administrative_area_level_4" ? (
              <li key={index} className="flex flex-col gap-2">
                <div>{data.formatted_address}</div>
                <div>
                  <li>
                    NorthEast - {data.geometry.bounds.northeast.lat},{" "}
                    {data.geometry.bounds.northeast.lng}
                  </li>
                  <li>
                    Southwest - {data.geometry.bounds.southwest.lat},{" "}
                    {data.geometry.bounds.southwest.lng}
                  </li>
                </div>
              </li>
            ) : (
              <></>
            )
          )}

        <p>{latitude}</p>
        <p>{longitude}</p>
        <button type="submit" className="kButton w-full">
          Create Account
        </button>
      </form>
    </div>
  );
};
