import "./ProfileCard.css";

import React from "react";

const ProfileCard = ({ name, position }) => {
  return (
    <div className="profile-card-container">
      <div className="image"></div>
      <div className="details">
        <span className="name">{name}</span>
        <span className="position">{position}</span>
      </div>
    </div>
  );
};

export default ProfileCard;
