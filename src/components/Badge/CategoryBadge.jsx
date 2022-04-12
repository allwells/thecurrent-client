import "./CategoryBadge.css";

import { Badge } from "@mantine/core";
import Purify from "../../utils/Purify";
import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryBadge = ({ color, blog }) => {
  const navigate = useNavigate();

  return (
    <Badge
      size="xs"
      radius="xs"
      variant="dot"
      onClick={() => navigate(`/category/${blog.category}`)}
      style={{ color: color }}
      className="category-badge"
    >
      {Purify(blog.category)}
    </Badge>
  );
};

export default CategoryBadge;
