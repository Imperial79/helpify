import React, { useContext } from "react";
import { Context } from "../context/ContextProvider";

function ContentArea({ children }) {
  const { showNavBar } = useContext(Context);

  return (
    <div
      className={`p-10 ${
        showNavBar ? "mt-[80px]" : "md:mt-[80px] mt-0"
      } max-w-5xl mx-auto w-full`}
    >
      {children}
    </div>
  );
}

export default ContentArea;
