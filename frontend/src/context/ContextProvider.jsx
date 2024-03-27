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
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (location.pathname == "/" || location.pathname == "/profile") {
      const fetchUsers = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:8080/users/`);
          setUsers(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
        } finally {
          setLoading(false);
        }
      };
      const fetchPosts = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:8080/posts/`);
          setPosts(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUsers();
      fetchPosts();
    }
  }, [location]);
  const uid = window.localStorage.getItem("userID");
  useEffect(() => {
    if (uid) {
      console.log("My UID -> " + uid);
      setuserID(uid);
    } else {
      navigate("/login", { replace: true });
    }
  }, [uid]);

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
        usersList,
        setUsers,
        posts,
        setPosts,
        isLoading,
        setLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
