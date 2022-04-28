import "./ServerError.style.css";

import React from "react";
import ServerErrorSVG from "./ServerErrorSVG";
import { useNavigate } from "react-router-dom";

const ServerError = () => {
  const navigate = useNavigate();

  return (
    <div className="server-error px-4">
      <span className="title is-4 is-spaced has-text-centered">
        500 Internal Server Error
      </span>
      <span className="subtitle is-6 has-text-centered">
        There was an error, please try again later.
      </span>
      <ServerErrorSVG />
      <button className="button is-link" onClick={() => navigate("/")}>
        Go To Home
      </button>
    </div>
  );
};

export default ServerError;
