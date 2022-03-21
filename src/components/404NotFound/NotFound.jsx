import "./NotFound.style.css";

import React from "react";
import notFound from "./page-not-found.png";

const NotFound = () => {
  const notFoundStyle = {
    backgroundImage: `url(${notFound})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="notFound">
      <div style={notFoundStyle}></div>
      <span>PAGE NOT FOUND</span>
    </div>
  );
};

export default NotFound;
