import "./NavBar.css";

import {
  Dashboard,
  InfoCircle,
  Login,
  Logout,
  Search,
  Settings,
} from "tabler-icons-react";
import { Divider, Menu } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import CategoryItem from "./CategoryItem";
import anchorLogo from "../../img/anchor-logo.png";
import axios from "axios";
import thecurrentLogo from "../../img/thecurrent-logo.png";
import { useViewportSize } from "@mantine/hooks";

export default function NavBar() {
  const navigate = useNavigate();
  const viewPort = useViewportSize();
  const mobileViewPort = 768;

  const [loggedIn, setLoggedIn] = useState(false);
  // eslint-disable-next-line
  const [name, setName] = useState("");
  // eslint-disable-next-line
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);

      axios
        .post(`${process.env.REACT_APP_BASE_URL}/data`, {
          token: localStorage.getItem("token"),
        })
        .then((res) => {
          setName(res.data.name);
          setEmail(res.data.email);
        })
        .catch((err) => {
          localStorage.removeItem("token");
          setLoggedIn(false);
        });
    }
  }, []);

  // HANDLE SEARCH ACTION
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${query}`);
  };

  return (
    <div className="header-section">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          {/* LOGO */}
          <span
            id="logo-section"
            className="navbar-item"
            onClick={() => {
              navigate("/");
            }}
          >
            <img className="is-clickable" src={anchorLogo} alt="logo" />
            <img className="is-clickable" src={thecurrentLogo} alt="logo" />
          </span>

          {/* NAVBAR BURGER - FOR SMALLER SCREENS */}
          {loggedIn ? (
            <a
              role="button"
              aria-label="menu"
              aria-expanded="false"
              className="navbar-burger"
              data-target="navbarBasicExample"
            ></a>
          ) : (
            <a
              role="button"
              aria-label="menu"
              aria-expanded="false"
              className="navbar-burger"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          )}
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          {/* SEARCH FORM */}
          <form
            onSubmit={(e) => {
              handleSearch(e);
            }}
            className="search-form mr-4 is-flex is-justify-content-between is-align-items-center"
          >
            {/* SEARCH INPUT FIELD */}
            <div className="control">
              <input
                type="text"
                value={query}
                className="input"
                aria-label="Search"
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                placeholder="Search news..."
              />
            </div>

            {/* SEARCH BUTTON ELEMENT */}
            <button className="button is-clickable is-link" type="submit">
              <Search />
            </button>
          </form>

          {loggedIn ? (
            // <Burger
            //   color="#368dd6"
            //   opened={opened}
            //   onClick={() => setOpened((o) => !o)}
            // />
            <Menu placement="end" withArrow>
              <Menu.Item
                icon={<Dashboard size={14} />}
                component={Link}
                to="/dashboard"
              >
                Dashboard
              </Menu.Item>
              <Menu.Item
                icon={<Settings size={14} />}
                component={Link}
                to="/settings"
              >
                Settings
              </Menu.Item>
              <Divider />
              <Menu.Item icon={<Logout size={14} />} color="red">
                Logout
              </Menu.Item>
            </Menu>
          ) : (
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  {/* LOGIN BUTTON */}
                  <a
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="login-button button is-link is-light"
                  >
                    <Login className="mr-1" />
                    Log in
                  </a>

                  {/* ABOUT US BUTTON - FOR VIEWERS */}
                  <a
                    onClick={() => {
                      navigate("/about");
                    }}
                    className="about-button button is-warning"
                  >
                    <InfoCircle className="mr-1" />
                    About Us
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* LOWER NAVBAR SECTION - NEWS CATEGORIES */}
      <nav
        class="breadcrumb is-small is-flex is-justify-content-center has-bullet-separator"
        aria-label="breadcrumbs"
      >
        <ul className="has-background-white m-0 py-2 is-flex is-justify-content-center">
          <CategoryItem />
        </ul>
      </nav>
    </div>
  );
}

// <ExtendedNav
//   opened={opened}
//   loggedIn={loggedIn}
//   closeButton={() => setOpened((o) => !o)}
// />
