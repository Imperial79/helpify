import React, { useContext } from "react";
import { Context } from "../context/ContextProvider";
import { useLocation } from "react-router-dom";

function ContentArea({ children }) {
  const { showNavBar } = useContext(Context);
  const location = useLocation();
  return (
    <div
      className={`md:p-10 p-3 ${
        showNavBar ? "mt-[80px]" : "md:mt-[80px] mt-0"
      } ${location.pathname == "/" ? "" : "max-w-5xl"}  mx-auto w-full`}
    >
      {children}
    </div>
  );
}

export default ContentArea;
