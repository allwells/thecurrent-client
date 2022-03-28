import "./NewsCard.css";

import CategoryBadge from "../Badge/CategoryBadge";
import DatePublished from "../DatePublished/DatePublished";
import React from "react";

const NewsCardBig = ({ blog, onClick }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${blog.image})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      onClick={onClick}
      className="news-card"
    >
      <div className="tint">
        <CategoryBadge color="#ffffff" blog={blog} onClick={onClick} />
        <DatePublished blog={blog} />
        <h3>{blog.title}</h3>
      </div>
    </div>
  );
};

export default NewsCardBig;
