import "./ExtendedNav.css";

import { CloseButton } from "@mantine/core";
import ExtendedNavLink from "./ExtendedNavLink";
import { Navbar } from "react-bootstrap";
import React from "react";
import anchorLogo from "../../img/anchor-logo.png";
import thecurrentLogo from "../../img/thecurrent-logo.png";
import { useNavigate } from "react-router-dom";

const ExtendedNav = ({ opened, closeButton, loggedIn }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: opened ? "flex" : "none",
      }}
      className="extended-nav"
    >
      <div className="close-button-container">
        <Navbar.Brand
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={anchorLogo} height={35} alt="logo" />
          <img src={thecurrentLogo} height={35} alt="logo" />
        </Navbar.Brand>
        <CloseButton
          size="xl"
          color="dark"
          iconSize={20}
          onClick={closeButton}
          className="close-button"
        />
      </div>
      <div className="extended-nav-items">
        <ExtendedNavLink to="/" onClick={closeButton} item="Home" />
        {loggedIn ? (
          <ExtendedNavLink to="/profile" onClick={closeButton} item="Profile" />
        ) : (
          <ExtendedNavLink to="/about" onClick={closeButton} item="About Us" />
        )}
        <ExtendedNavLink
          to="/category/anchor-university"
          onClick={closeButton}
          item="Anchor University"
        />
        <ExtendedNavLink
          to="/category/education"
          onClick={closeButton}
          item="Education"
        />
        <ExtendedNavLink
          to="/category/entertainment"
          onClick={closeButton}
          item="Entertainment"
        />
        <ExtendedNavLink
          to="/category/arts-and-culture"
          onClick={closeButton}
          item="Arts and Culture"
        />
        <ExtendedNavLink
          to="/category/business-and-economy"
          onClick={closeButton}
          item="Business and Economy"
        />
        <ExtendedNavLink
          to="/category/editorial"
          onClick={closeButton}
          item="Editorial"
        />
        <ExtendedNavLink
          to="/category/fashion"
          onClick={closeButton}
          item="Fashion"
        />
        <ExtendedNavLink
          to="/category/feature"
          onClick={closeButton}
          item="Feature"
        />
        <ExtendedNavLink
          to="/category/health"
          onClick={closeButton}
          item="Health"
        />
        <ExtendedNavLink
          to="/category/opinion"
          onClick={closeButton}
          item="Opinion"
        />
        <ExtendedNavLink
          to="/category/science-and-technology"
          onClick={closeButton}
          item="Science and Technology"
        />
        <ExtendedNavLink
          to="/category/sport"
          onClick={closeButton}
          item="Sport"
        />
        <ExtendedNavLink
          to="/category/transport"
          onClick={closeButton}
          item="Transport"
        />
      </div>
    </div>
  );
};

export default ExtendedNav;
