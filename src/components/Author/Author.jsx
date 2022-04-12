import "./Author.css";

import React from "react";

const Author = ({ blog, color }) => {
  return (
    <div className="author">
      <span style={{ color: color }} className="author-name">
        {blog.author}
      </span>
    </div>
  );
};

export default Author;
