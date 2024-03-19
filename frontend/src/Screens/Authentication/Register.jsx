import React, { useState } from 'react';
import axios from 'axios';
import { useGeolocated } from 'react-geolocated';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

  const handleGetLocation = () => {
    if (isGeolocationAvailable) {
      if(isGeolocationEnabled){
        setLatitude(coords.latitude)
        setLongitude(coords.longitude);
      }else{
        console.error('Geolocation is not enabled.');
      }

    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Registration data:', { name, email, password, latitude, longitude });
    try{
      await axios.post("http://localhost:8080/users/register",{
          name,
          email,
          password,
          latitude,
          longitude
      });
      alert("registered");
  }catch(e){
      console.log(e);
  }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
      <h2 className='font-bold text-2xl text-center'>Register</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block font-semibold mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-semibold mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded py-2 px-3"
            required
          />
        </div>
        <div className="mb-6">
          <button
            type="button"
            onClick={handleGetLocation}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Get Location
          </button>
          {latitude && longitude && (
            <div className="mt-2">
              <p>Latitude: {latitude}</p>
              <p>Longitude: {longitude}</p>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
};

