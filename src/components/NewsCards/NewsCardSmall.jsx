import "./NewsCardSmall.css";

import { ArrowRight } from "tabler-icons-react";
import CategoryBadge from "../Badge/CategoryBadge";
import DatePublished from "../DatePublished/DatePublished";
import { Highlight } from "@mantine/core";
import React from "react";

const NewsCardSmall = ({ blog, query, handlePost }) => {
  const cardImageStyle = {
    backgroundImage: `url(${blog.image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="post-card has-background-white">
      {blog.cloudinaryId ? (
        <div className="card-image" style={cardImageStyle}></div>
      ) : null}
      <div className="pt-3 pb-1 px-2 is-flexl is-flex-column is-justify-content-space-between is-align-items-flex-start">
        {/* DATE CREATED AND HASHTAG */}

        <div className="datetime mb-2 is-flex is-justify-content-space-between is-align-items-center">
          {/* Date */}
          <DatePublished blog={blog} />

          {/* Hashtag */}
          <CategoryBadge blog={blog} color="#333" />
        </div>

        {/* CARD TITLE */}
        <h1 style={{ cursor: "default" }}>
          <Highlight
            className="post-title title is-5 has-text-weight-semibold has-text-dark"
            highlight={query}
          >
            {blog.title}
          </Highlight>
        </h1>

        <div className="read-more-button mt-3 is-flex is-justify-content-flex-end">
          <button
            className="button is-link has-text-weight-semibold is-size-6"
            onClick={() => {
              handlePost(blog._id);
            }}
          >
            View <ArrowRight className="right-arrow ml-1" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCardSmall;
