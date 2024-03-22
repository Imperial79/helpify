import React from "react";

function ContentArea({ children }) {
  return (
    <div className="mt-[60px] p-5 max-w-5xl mx-auto items-start w-full">
      {children}
    </div>
  );
}

export default ContentArea;
