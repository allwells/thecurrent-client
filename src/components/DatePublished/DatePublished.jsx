import React from "react";

const DatePublished = ({ blog }) => {
  return (
    <span id="date" className="is-size-7 has-text-grey">
      {new Date(blog.created_at).toDateString()}
    </span>
  );
};

export default DatePublished;
