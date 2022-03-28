import "./Author.css";

import React from "react";

const Author = ({ blog, color, label = true }) => {
  return (
    <div className="author">
      {label ? (
        <span style={{ color: color }} className="author-label">
          Author:{" "}
        </span>
      ) : null}
      <span style={{ color: color }} className="author-name">
        {blog.author}
      </span>
    </div>
  );
};

export default Author;
