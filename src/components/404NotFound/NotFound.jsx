import "./NotFound.style.css";

import React from "react";
import notFound from "./pagenotfound.svg";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found px-4">
      <span className="title is-4 is-spaced has-text-centered">
        Sorry, page not found!
      </span>
      <span className="subtitle is-6 has-text-centered">
        Sorry, we couldn't find the page you're looking for. Perhaps you've
        mistyped the URL?
      </span>
      <span className="subtitle is-6 has-text-centered">
        Be sure to check your spelling.
      </span>
      <img className="my-5" src={notFound} alt="page not found" />
      <button
        className="button is-link is-light has-text-weight-bold"
        onClick={() => navigate("/")}
      >
        Go To Home
      </button>
    </div>
  );
};

export default NotFound;
