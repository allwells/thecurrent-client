import "./ExtendedNavLink.css";

import { Link } from "react-router-dom";
import React from "react";

const ExtendedNavLink = ({ to, item, onClick }) => {
  return (
    <Link onClick={onClick} className="extended-nav-link" to={to}>
      {item}
    </Link>
  );
};

export default ExtendedNavLink;
