import { useContext, useEffect } from "react";
import { Context } from "../context/ContextProvider";

function Alert() {
  const { alert, isAlertShow, setisAlertShow } = useContext(Context);
  const label = alert["isDanger"] ? "Oops!" : "Success!";
  const content = alert["content"];
  const isDanger = alert["isDanger"];

  useEffect(() => {
    setTimeout(() => {
      setisAlertShow(false);
    }, 2000);
  }, [isAlertShow]);

  return (
    <div
      className={`z-50 fixed top-0 right-0 transition-opacity duration-300 max-w-[400px] ${
        !isAlertShow ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div
        className={`shadow-2xl flex items-center p-4 m-5 text-sm border ${
          isDanger
            ? "bg-red-100 text-red-700 border-green-700"
            : "bg-green-100 text-green-700 border-green-700"
        } rounded-lg`}
        role="alert"
      >
        <svg
          className="flex-shrink-0 inline w-6 h-6 mr-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>

        <div>
          <h2 className="text-xl font-semibold">{label}</h2>
          <p className="text-sm font-medium">{content}</p>
        </div>
      </div>
    </div>
  );
}

export default Alert;
