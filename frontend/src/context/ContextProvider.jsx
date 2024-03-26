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

  const [userID, setuserID] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const uid = window.localStorage.getItem("userID");

    if (uid) {
      console.log("My UID -> " + uid);
      setuserID(uid);
    } else {
      navigate("/login", { replace: true });
    }
  }, [userID]);

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
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
