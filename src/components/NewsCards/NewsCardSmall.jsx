import "./NewsCardSmall.css";

import { Edit, Trash } from "tabler-icons-react";
import { Highlight, Menu } from "@mantine/core";

import Author from "../Author/Author";
import { Card } from "react-bootstrap";
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
  profile = false,
}) => {
  return (
    <div className="post-card">
      {blog.cloudinaryId ? (
        <Card.Img
          variant="top"
          src={blog.image}
          style={{ cursor: profile ? "pointer" : "default" }}
          onClick={() => (profile ? handlePost(blog._id) : null)}
        />
      ) : null}
      <div className="card-body">
        {profile ? (
          <div className="menu-container">
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
        <h1
          style={{ cursor: profile ? "pointer" : "default" }}
          onClick={() => (profile ? handlePost(blog._id) : null)}
        >
          <Highlight className="post-title" highlight={query}>
            {blog.title}
          </Highlight>
        </h1>

        <div className="card-body-bottom">
          <div className="created-at">
            <DatePublished blog={blog} />
            <span className="divider"></span>
            <CategoryBadge blog={blog} color="#333" />
            <span className="divider"></span>
            <Author blog={blog} />
          </div>
          <div className="blog-items">
            {profile ? null : (
              <button
                className="read-mor button is-link is-light has-text-weight-semibold is-size-6"
                onClick={() => {
                  handlePost(blog._id);
                }}
              >
                Read More
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCardSmall;
