import "./SelectForm.css";

import React from "react";
import { Select } from "@mantine/core";

const SelectForm = ({
  category,
  setCategory,
  errorMsg = true,
  placeholder = "Select tag",
}) => {
  const categoryData = [
    {
      value: "anchor-university",
      label: "#AnchorUniversity",
    },
    {
      value: "arts-and-culture",
      label: "#ArtsAndCulture",
    },
    {
      value: "business-and-economy",
      label: "#BusinessAndEconomy",
    },
    {
      value: "editorial",
      label: "#Editorial",
    },
    {
      value: "education",
      label: "#Education",
    },
    {
      value: "entertainment",
      label: "#Entertainment",
    },
    {
      value: "fashion",
      label: "#Fashion",
    },
    {
      value: "feature",
      label: "#Feature",
    },
    {
      value: "health",
      label: "#Health",
    },
    {
      value: "opinion",
      label: "#Opinion",
    },
    {
      value: "science-and-technology",
      label: "#ScienceAndTechnology",
    },
    {
      value: "sports",
      label: "#Sports",
    },
    {
      value: "transportation",
      label: "#Transportation",
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
            ? "Select at one hashtag for you post"
            : ""
          : null
      }
      required
    />
  );
};

export default SelectForm;
