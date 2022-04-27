import { Link } from "react-router-dom";
import { PurifyReverse } from "../../utils/Purify";
import React from "react";

const CategoryItem = ({ text, path }) => {
  const categoryItems = [
    {
      id: 1,
      label: "Anchor University",
    },
    {
      id: 2,
      label: "Education",
    },
    {
      id: 3,
      label: "Entertainment",
    },
    {
      id: 4,
      label: "Arts and Culture",
    },
    {
      id: 5,
      label: "Business and Economy",
    },
    {
      id: 6,
      label: "Editorial",
    },
    {
      id: 7,
      label: "Fashion",
    },
    {
      id: 8,
      label: "Feature",
    },
    {
      id: 9,
      label: "Health",
    },
    {
      id: 10,
      label: "Opinion",
    },
    {
      id: 11,
      label: "Science and Technology",
    },
    {
      id: 12,
      label: "Sports",
    },
    {
      id: 13,
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
