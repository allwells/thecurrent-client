import { Link } from "react-router-dom";
import { PurifyReverse } from "../../utils/Purify";
import React from "react";

const CategoryItem = ({ text, path }) => {
  const categoryItems = [
    {
      id: 1,
      label: "Latest",
    },
    {
      id: 2,
      label: "Anchor University",
    },
    {
      id: 3,
      label: "Education",
    },
    {
      id: 4,
      label: "Entertainment",
    },
    {
      id: 5,
      label: "Arts and Culture",
    },
    {
      id: 6,
      label: "Business and Economy",
    },
    {
      id: 7,
      label: "Editorial",
    },
    {
      id: 8,
      label: "Fashion",
    },
    {
      id: 9,
      label: "Feature",
    },
    {
      id: 10,
      label: "Health",
    },
    {
      id: 11,
      label: "Opinion",
    },
    {
      id: 12,
      label: "Science and Technology",
    },
    {
      id: 13,
      label: "Sports",
    },
    {
      id: 14,
      label: "Transportation",
    },
  ];

  return categoryItems.map((category) => {
    return (
      <li key={category.id}>
        <Link
          className="has-text-weight-semibold"
          to={"/category/" + PurifyReverse(category.label)}
        >
          {category.label}
        </Link>
      </li>
    );
  });
};

export default CategoryItem;
