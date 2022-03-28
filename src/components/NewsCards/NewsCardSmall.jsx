import "./NewsCardSmall.css";

import { Button, Highlight, Menu } from "@mantine/core";
import { Edit, Trash } from "tabler-icons-react";

import { Card } from "react-bootstrap";
import CategoryBadge from "../Badge/CategoryBadge";
import DatePublished from "../DatePublished/DatePublished";
import React from "react";

const NewsCardSmall = ({
  blog,
  query,
  handlePost,
  handleEdit,
  setCategory,
  handleDelete,
  profile = false,
}) => {
  return (
    <Card className="blog-card">
      {blog.cloudinaryId ? (
        <Card.Img
          variant="top"
          src={blog.image}
          style={{ cursor: profile ? "pointer" : "default" }}
          onClick={() => (profile ? handlePost(blog._id) : null)}
        />
      ) : null}
      <Card.Body>
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
                onClick={() => {
                  handleDelete(blog._id);
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
            <CategoryBadge blog={blog} color="#333" onClick={setCategory} />
          </div>
          <div className="blog-items">
            {profile ? null : (
              <Button
                className="read-more"
                onClick={() => {
                  handlePost(blog._id);
                }}
                variant="light"
                compact
              >
                Read More
              </Button>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default NewsCardSmall;
