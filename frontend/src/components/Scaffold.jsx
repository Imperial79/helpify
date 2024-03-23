import React from "react";
import FullScreenLoading from "./FullScrenLoading";

function Scaffold({ isLoading, children }) {
  return (
    <div className="relative">
      <FullScreenLoading isLoading={isLoading} />
      {children}
    </div>
  );
}

export default Scaffold;
