import "./NewsCard.css";

import Purify from "../../utils/Purify";
import React from "react";

const NewsCardBig = ({ title, date, category, img, onClick }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      onClick={onClick}
      className="newsCard"
    >
      <div className="tint">
        <span className="category">{Purify(category)}</span>
        <span className="date">{date}</span>
        <h2>{title}</h2>
      </div>
    </div>
  );
};

export default NewsCardBig;
