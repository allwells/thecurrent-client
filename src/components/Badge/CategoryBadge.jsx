import "./CategoryBadge.css";

import Purify from "../../utils/Purify";
import React from "react";
import createHashTag from "../../utils/CreateHashTag";
import { useNavigate } from "react-router-dom";

const CategoryBadge = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <span
      onClick={() => navigate(`/category/${blog.category}`)}
      className="category-badge has-text-link has-text-weight-medium"
    >
      #{createHashTag(Purify(blog.category))}
    </span>
  );
};

export default CategoryBadge;
