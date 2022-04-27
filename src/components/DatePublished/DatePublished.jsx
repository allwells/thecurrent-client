import "./DatePublished.css";

import React from "react";

const DatePublished = ({ blog }) => {
  return (
    <span className="is-size-6">
      {new Date(blog.created_at).toDateString()}
    </span>
  );
};

export default DatePublished;
