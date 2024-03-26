import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const uid = window.localStorage.getItem("userID");

    if (uid) {
      console.log("My UID -> " + uid);
      setUserId(uid);
    } else {
      navigate("/login", { replace: true });
    }
  }, [userId]);

  return (
    <Context.Provider
      value={{
        alert,
        isAlertShow,
        setisAlertShow,
        showAlert,
        showNavBar,
        userId,
        setUserId,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
