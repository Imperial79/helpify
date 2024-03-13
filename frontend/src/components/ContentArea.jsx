import React from "react";

function ContentArea({ children }) {
  return (
    <div className="mt-[100px] p-5 max-w-5xl mx-auto items-center">
      {children}
    </div>
  );
}

export default ContentArea;
