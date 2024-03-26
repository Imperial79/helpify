import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const Context = React.createContext();
function ContextProvider({ children }) {
  const [alert, setAlert] = useState({
    content: "",
    isDanger: false,
  });
  const [isAlertShow, setisAlertShow] = useState(false);

  // This will store user data for local session which can be accessed anywhere in the website using context api
  const [user, setUser] = useState(null);

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
    console.log(location.pathname);
    if (location.pathname == "/login" || location.pathname == "/register") {
      setShowNavBar(false);
    } else {
      setShowNavBar(true);
    }
  }, [location]);

  return (
    <Context.Provider
      value={{
        alert,
        isAlertShow,
        setisAlertShow,
        showAlert,
        user,
        setUser,
        showNavBar,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
