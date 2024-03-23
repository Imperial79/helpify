import React, { useState } from "react";
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

  return (
    <Context.Provider
      value={{
        alert,
        isAlertShow,
        setisAlertShow,
        showAlert,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
