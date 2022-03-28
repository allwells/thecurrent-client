import "./CategoryBadge.css";

import { Badge } from "@mantine/core";
import Purify from "../../utils/Purify";
import React from "react";

const CategoryBadge = ({ color, blog, onClick }) => {
  return (
    <Badge
      size="xs"
      radius="xs"
      variant="dot"
      onClick={onClick}
      style={{ color: color }}
      className="category-badge"
    >
      {Purify(blog.category)}
    </Badge>
  );
};

export default CategoryBadge;
