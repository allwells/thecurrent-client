import "./Author.css";

import React from "react";

const Author = ({ blog }) => {
  return (
    <div className="author">
      <span className="author-label">Author: </span>
      <span className="author-name">Chisom Emmanual</span>
    </div>
  );
};

export default Author;
