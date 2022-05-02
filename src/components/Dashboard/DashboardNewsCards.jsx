import "./DashboardNewsCards.css";

import { ArrowRight, Edit, Trash } from "tabler-icons-react";

import CategoryBadge from "../Badge/CategoryBadge";
import { Confirm } from "react-st-modal";
import DatePublished from "../DatePublished/DatePublished";
import { Highlight } from "@mantine/core";
import React from "react";
import { useParams } from "react-router-dom";

const DashboardNewsCards = ({
  blog,
  handlePost,
  handleEdit,
  isDashboard = true,
  handleDelete,
}) => {
  const { query } = useParams();

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
        <h1>
          <Highlight
            className="title is-5 has-text-weight-semibold has-text-dark"
            highlight={query}
          >
            {blog.title}
          </Highlight>
        </h1>
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

        {isDashboard ? (
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
        ) : null}
      </div>
    </div>
  );
};

export default DashboardNewsCards;
