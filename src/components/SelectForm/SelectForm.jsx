import "./SelectForm.css";

import React from "react";
import { Select } from "@mantine/core";

const SelectForm = ({
  category,
  setCategory,
  errorMsg = true,
  placeholder = "Pick one",
}) => {
  const categoryData = [
    {
      value: "anchor-university",
      label: "Anchor University",
    },
    {
      value: "arts-and-culture",
      label: "Arts and Culture",
    },
    {
      value: "business-and-economy",
      label: "Business and Economy",
    },
    {
      value: "editorial",
      label: "Editorial",
    },
    {
      value: "education",
      label: "Education",
    },
    {
      value: "entertainment",
      label: "Entertainment",
    },
    {
      value: "fashion",
      label: "Fashion",
    },
    {
      value: "feature",
      label: "Feature",
    },
    {
      value: "health",
      label: "Health",
    },
    {
      value: "opinion",
      label: "Opinion",
    },
    {
      value: "science-and-technology",
      label: "Science and Technology",
    },
    {
      value: "sport",
      label: "Sport",
    },
    {
      value: "transport",
      label: "Transport",
    },
  ];

  return (
    <Select
      id="selectForm"
      value={category}
      label={errorMsg ? "Category" : ""}
      data={categoryData}
      onChange={setCategory}
      placeholder={placeholder}
      error={
        errorMsg
          ? category === ""
            ? "Select at least one from the options"
            : ""
          : null
      }
      required
    />
  );
};

export default SelectForm;
