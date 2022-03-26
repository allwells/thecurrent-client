import "./NotFound.style.css";

import { Button } from "@mantine/core";
import React from "react";
import notFound from "./page-not-found.png";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const notFoundStyle = {
    backgroundImage: `url(${notFound})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="notFound">
      <div className="illustration" style={notFoundStyle}></div>
      <span className="page-not-found">PAGE NOT FOUND</span>
      <Button
        variant="subtle"
        className="back-button"
        onClick={() => navigate("/")}
      >
        Back to Home
      </Button>
    </div>
  );
};

export default NotFound;
