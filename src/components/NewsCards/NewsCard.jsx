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
      className="news-card"
    >
      <div className="tint p-4 is-flex is-flex-direction-column is-justify-content-space-between is-align-items-center">
        {/* HASHTAG - NEWS CATEGORY */}
        <div className="category-tag is-full is-flex is-justify-content-end">
          <CategoryBadge blog={blog} />
        </div>

        <div className="is-full">
          {/* DATE */}
          <DatePublished blog={blog} />

          {/* CARD TITLE */}
          <h3 onClick={onClick} className="title is-6 has-text-light">
            {blog.title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default NewsCardBig;
