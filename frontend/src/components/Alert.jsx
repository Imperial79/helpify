import { useContext, useEffect } from "react";
import { Context } from "../context/ContextProvider";

function Alert() {
  const { alert, isAlertShow, setisAlertShow } = useContext(Context);
  const label = alert["isDanger"] ? "Oops!" : "Success!";
  const content = alert["content"] ?? "";
  const isDanger = alert["isDanger"] ?? false;

  useEffect(() => {
    setTimeout(() => {
      setisAlertShow(false);
    }, 2000);
  }, [isAlertShow]);

  return (
    <div
      className={`z-50 fixed top-0 mx-auto transition-opacity duration-300 w-screen ${!isAlertShow ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
    >
      <div
        className={`max-w-[1000px] mx-auto flex items-center p-3 m-2 text-sm border ${isDanger ? "bg-black text-white" : "bg-blue-950 text-white"
          } rounded-sm`}
        role="alert"
      >
        <svg
          className="flex-shrink-0 inline w-5 h-5 mr-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>

        <h2 className="text-lg font-semibold pr-2">{label}</h2>
        <p className="text-sm font-medium">{content}</p>
      </div>
    </div>
  );
}

export default Alert;
