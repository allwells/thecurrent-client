import "./Author.css";

import React from "react";

const Author = ({ blog }) => {
  return (
    <div className="author">
      <span className="author-label">Author(s): </span>
      <span className="author-name">{blog.author}</span>
    </div>
  );
};

export default Author;
