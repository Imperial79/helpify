import React from "react";
import { useGeolocated } from "react-geolocated";


// function getLocation() {
//   if (!navigator.geolocation) {
//     console.log('Geolocation API not supported by this browser.');
//   } else {
//     console.log('Checking location...');
//     navigator.geolocation.getCurrentPosition(success, error);
//   }
// }

// // function success(position) {
// //   console.log(position);
// // }

// function success(position) {
//   console.log('Latitude:', position.coords.latitude);
//   console.log('Longitude:', position.coords.longitude);
// }

// function error() {
//   console.log('Geolocation error!');
// }

// document.getElementById('get-location').addEventListener('click', getLocation);

function Geolocation() {

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    return !isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
    ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
    ) : coords ? (
        <table>
            <tbody>
                <tr>
                    <td>latitude: </td>
                    <td>{coords.latitude}</td>
                </tr>
                <tr>
                    <td>longitude:</td>
                    <td>{coords.longitude}</td>
                </tr>                                
            </tbody>
        </table>
    ) : (
        <div>Getting the location data&hellip; </div>
    );
};

export default Geolocation;