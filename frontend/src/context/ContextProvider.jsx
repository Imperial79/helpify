import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
export const Context = React.createContext();
function ContextProvider({ children }) {
  const [alert, setAlert] = useState({
    content: "",
    isDanger: false,
  });
  const [isAlertShow, setisAlertShow] = useState(false);

  const showAlert = (message, isDanger) => {
    setisAlertShow(true);
    setAlert({
      content: message,
      isDanger: isDanger,
    });
  };
  const [showNavBar, setShowNavBar] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname == "/login" || location.pathname == "/register") {
      setShowNavBar(false);
    } else {
      setShowNavBar(true);
    }
  }, [location]);

  const [userID, setuserID] = useState(null);
  const navigate = useNavigate();
  const [usersList, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [profileUser, setProfileUser] = useState({});
  const [profilePosts, setProfilePosts] = useState([]);
  const [place_id, setPlaceID] = useState("");
  const [city, setCity] = useState("");
  const [isLoading, setLoading] = useState(false);

  const uid = window.localStorage.getItem("userID");
  useEffect(() => {
    if (uid) {
      console.log("My UID -> " + uid);
      setuserID(uid);
      fetchData(uid);
    } else {
      if (location.pathname != "/register")
        navigate("/login", { replace: true });
    }
  }, [navigate]);

  const fetchData = async (uid) => {
    try {
      setLoading(true);
      const profileUserResponse = await axios.get(
        `http://localhost:8080/users/profile/${uid}`
      );

      setProfileUser(profileUserResponse.data);
      setCity(profileUserResponse.data.city);
      const place_id = profileUserResponse.data.place_id;
      setPlaceID(place_id);

      const [usersResponse, postsResponse] = await Promise.all([
        axios.get(`http://localhost:8080/users/${place_id}`),
        axios.get(`http://localhost:8080/posts/${place_id}`),
      ]);
      setUsers(usersResponse.data);
      setPosts(postsResponse.data);
      if (location.pathname === "/profile") {
        const profilePostsResponse = await axios.get(
          `http://localhost:8080/posts/profile-post/${uid}`
        );
        setProfilePosts(profilePostsResponse.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Context.Provider
      value={{
        alert,
        isAlertShow,
        setisAlertShow,
        showAlert,
        showNavBar,
        userID,
        setuserID,
        isLoading,
        setLoading,
        profileUser,
        setProfileUser,
        profilePosts,
        setProfilePosts,
        usersList,
        setUsers,
        posts,
        setPosts,
        city,
        place_id,
        fetchData,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
