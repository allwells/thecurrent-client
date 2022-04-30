import "./NewsCardSmall.css";

import { ArrowRight, Edit, Trash } from "tabler-icons-react";
import { Highlight, Menu } from "@mantine/core";

import CategoryBadge from "../Badge/CategoryBadge";
import { Confirm } from "react-st-modal";
import DatePublished from "../DatePublished/DatePublished";
import React from "react";

const NewsCardSmall = ({
  blog,
  query,
  handlePost,
  handleEdit,
  handleDelete,
  isDashboard = false,
}) => {
  const cardImageStyle = {
    backgroundImage: `url(${blog.image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    cursor: isDashboard ? "pointer !important" : "default !important",
  };

  return (
    <div className="post-card has-background-white">
      {blog.cloudinaryId ? (
        <div
          className="card-image"
          style={cardImageStyle}
          onClick={() => (isDashboard ? handlePost(blog._id) : null)}
        ></div>
      ) : null}
      <div className="pt-3 pb-1 px-2 is-flexl is-flex-column is-justify-content-space-between is-align-items-flex-start">
        {isDashboard ? (
          // MENU OPTIONS - For Logged in user only
          <div className="borders menu-container">
            <Menu className="post-menu-items" shadow="xl">
              <Menu.Item
                onClick={() => {
                  handleEdit(blog._id);
                }}
                icon={<Edit size={14} />}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                onClick={async () => {
                  const result = await Confirm(
                    "Are you sure you want to delete this post?",
                    "Delete",
                    "Yes",
                    "No"
                  );

                  if (result) {
                    handleDelete(blog._id);
                  }
                }}
                icon={<Trash size={14} />}
              >
                Delete
              </Menu.Item>
            </Menu>
          </div>
        ) : null}

        {/* DATE CREATED AND HASHTAG */}

        <div className="datetime mb-2 is-flex is-justify-content-space-between is-align-items-center">
          {/* Date */}
          <DatePublished blog={blog} />

          {/* Hashtag */}
          <CategoryBadge blog={blog} color="#333" />
        </div>

        {/* CARD TITLE */}
        <h1
          style={{ cursor: isDashboard ? "pointer" : "default" }}
          onClick={() => (isDashboard ? handlePost(blog._id) : null)}
        >
          <Highlight
            className="post-title title is-5 has-text-weight-semibold has-text-dark"
            highlight={query}
          >
            {blog.title}
          </Highlight>
        </h1>

        <div className="read-more-button mt-3 is-flex is-justify-content-flex-end">
          {!isDashboard ? (
            <button
              className="button is-link has-text-weight-semibold is-size-6"
              onClick={() => {
                handlePost(blog._id);
              }}
            >
              Read More <ArrowRight className="right-arrow ml-1" size={20} />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NewsCardSmall;
