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
      <div className="tint p-4 is-full is-flex is-flex-direction-column is-justify-content-space-between is-align-items-center">
        <div className="is-full is-flex is-justify-content-flex-end">
          <CategoryBadge blog={blog} />
        </div>

        <div className="is-full has-background-success">
          <DatePublished blog={blog} />
          <h3 className="title is-4">{blog.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default NewsCardBig;
