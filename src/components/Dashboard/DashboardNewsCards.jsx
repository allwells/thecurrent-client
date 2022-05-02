import "./DashboardNewsCards.css";

import { ArrowRight, Edit, Trash } from "tabler-icons-react";
import { Highlight, Menu } from "@mantine/core";

import CategoryBadge from "../Badge/CategoryBadge";
import { Confirm } from "react-st-modal";
import DatePublished from "../DatePublished/DatePublished";
import React from "react";

const DashboardNewsCards = ({ blog, handlePost, handleEdit, handleDelete }) => {
  const dashboardCardImage = {
    backgroundImage: `url('${blog.image}')`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <div className="dashboard-cards-container">
      {/* Card image */}
      <div style={dashboardCardImage} className="dashboard-card-image"></div>

      <div className="dashboard-card-details py-3 px-2">
        <div className="datetime mb-2 is-flex is-justify-content-space-between is-align-items-center">
          {/* Date */}
          <DatePublished blog={blog} />

          {/* Hashtag */}
          <CategoryBadge blog={blog} color="#333" />
        </div>

        {/* Card title */}
        <h1 className="title is-5">{blog.title}</h1>
      </div>

      <div className="read-more-button-container mt-3 is-flex is-justify-content-space-between">
        <button
          className="button view-btn is-link has-text-weight-semibold is-size-6"
          onClick={() => {
            handlePost(blog._id);
          }}
        >
          View
          <ArrowRight className="right-arrow ml-1" size={20} />
        </button>

        {/* Delete and edit buttons container */}
        <div className="delete-and-edit is-flex is-justify-content-space-between">
          <button
            className="button edit-btn is-warning has-text-weight-semibold is-size-6"
            onClick={() => {
              handleEdit(blog._id);
            }}
          >
            Edit
            <Edit className="ml-1" size={20} />
          </button>
          <button
            className="button delete-btn is-danger has-text-weight-semibold is-size-6"
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
          >
            Delete
            <Trash className="ml-1" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardNewsCards;
