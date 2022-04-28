import "./ProfileCard.css";

import React from "react";
import img from "../../img/user.png";

const ProfileCard = ({ name, position }) => {
  return (
    <div className="profile-card p-4 has-background-white is-flex-grow-2 mb-2 mr-2 is-flex is-justify-content-flex-start is-align-items-center">
      <img className="mr-2" src={img} alt="profile" height={40} width={40} />
      <div className="is-flex is-flex-direction-column is-justify-content-center is-align-items-flex-start is-flex-wrap-wrap">
        <span className="title is-6 has-text-dark is-capitalized">{name}</span>
        <span className="subtitle is-7 has-text-grey">{position}</span>
      </div>
    </div>
  );
};

export default ProfileCard;
