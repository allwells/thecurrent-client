import "./DatePublished.css";

import React from "react";

const DatePublished = ({ blog }) => {
  return (
    <span className="date">{new Date(blog.created_at).toDateString()}</span>
  );
};

export default DatePublished;
