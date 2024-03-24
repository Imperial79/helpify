import React from "react";

const Modal = ({ isOpen, children }) => {
  const modalClass = `text-black fixed top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-300 ${
    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
  }`;

  return (
    <>
      <div className={modalClass}>
        <div className="bg-gray-100/80 w-full h-full"></div>

        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-white md:min-w-[40%] md:max-w-[600px] w-[90%] p-6 shadow-2xl opacity-100 transition-opacity duration-300 rounded-xl">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
