import "./NavBar.css";

import { Divider, Menu } from "@mantine/core";
import {
  InfoCircle,
  LayoutDashboard,
  Login,
  Logout,
  Menu2,
  Search,
} from "tabler-icons-react";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import CategoryItem from "./CategoryItem";
import anchorLogo from "../../img/anchor-logo.png";
import axios from "axios";
import profileBtnImg from "../../img/profileButtonImg.png";
import thecurrentLogo from "../../img/thecurrent-logo.png";

export default function NavBar() {
  const navigate = useNavigate();

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
    // Submits form
    e.preventDefault();

    // navigate to search results
    navigate(`/search/${query}`);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
            {/* <img className="is-clickable" src={anchorLogo} alt="logo" />
            <div className="has-background-link is-flex is-flex-direction-column">
              <span className="has-text-light is-uppercase is-size-7 has-text-weight-bold">
                The
              </span>
              <span className="has-text-light is-uppercase is-size-5 has-text-weight-bold">
                Current
              </span>
            </div> */}
            <img className="is-clickable" src={anchorLogo} alt="logo" />
            <img className="is-clickable" src={thecurrentLogo} alt="logo" />
          </span>
        </div>

        <div id="navbar-basic" className="navbar-menu">
          {/* SEARCH FORM */}
          <form
            onSubmit={(e) => {
              handleSearch(e);
            }}
            className="search-form mr-4 is-justify-content-between is-align-items-center"
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
                style={{ fontSize: "15px" }}
                placeholder="Search..."
              />
            </div>

            {/* SEARCH BUTTON ELEMENT */}
            <button className="button is-link" type="submit">
              <Search />
            </button>
          </form>

          {loggedIn ? (
            <div id="menu">
              <Menu
                size={"lg"}
                className="is-flex ml-5 is-justify-content-center is-align-items-center"
                placement="start"
                withArrow
                control={
                  // <button className="button is-link is-light">Profile</button>
                  <img
                    src={profileBtnImg}
                    width={"45"}
                    height={"45"}
                    style={{ borderRadius: "50%" }}
                    alt="profile"
                  />
                }
              >
                <Menu.Label id="search-form-label">SEARCH NEWS</Menu.Label>
                <Menu.Label id="search-form-form">
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
                        style={{ height: "34px", fontSize: "12px" }}
                        placeholder="Search..."
                      />
                    </div>

                    {/* SEARCH BUTTON ELEMENT */}
                    <button
                      type="submit"
                      className="button is-clickable is-link"
                      style={{
                        width: "28px",
                        height: "28px",
                        marginLeft: "-2.4rem",
                        boxShadow: "0 4px 8px #485fc777",
                      }}
                    >
                      <Search size={14} />
                    </button>
                  </form>
                </Menu.Label>
                <Divider id="search-form-divider" />
                <Menu.Label>DASHBOARD</Menu.Label>
                <Menu.Item
                  color="blue"
                  icon={<LayoutDashboard size={14} />}
                  component={Link}
                  to="/dashboard"
                >
                  Dashboard
                </Menu.Item>
                <Divider />
                <Menu.Label>LOGOUT</Menu.Label>
                <Menu.Item
                  onClick={() => logout()}
                  icon={<Logout size={14} />}
                  color="red"
                >
                  Logout
                </Menu.Item>
              </Menu>
            </div>
          ) : (
            <>
              <Menu
                size={"lg"}
                id="navbar-end-1"
                className="ml-4 is-justify-content-center is-align-items-center"
                placement="end"
                withArrow
                control={
                  <button className="button is-link is-light">
                    <Menu2 />
                  </button>
                }
              >
                <Menu.Label>SEARCH NEWS</Menu.Label>
                <Menu.Label>
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
                        style={{ height: "34px", fontSize: "12px" }}
                        placeholder="Search..."
                      />
                    </div>

                    {/* SEARCH BUTTON ELEMENT */}
                    <button
                      type="submit"
                      className="button is-clickable is-link"
                      style={{
                        width: "28px",
                        height: "28px",
                        marginLeft: "-2.4rem",
                        boxShadow: "0 4px 8px #485fc777",
                      }}
                    >
                      <Search size={14} />
                    </button>
                  </form>
                </Menu.Label>
                <Divider />
                <Menu.Label>LOGIN</Menu.Label>
                <Menu.Item
                  to="/login"
                  color="blue"
                  component={Link}
                  icon={<Login size={14} />}
                >
                  Log in
                </Menu.Item>
                <Divider />
                <Menu.Label>ABOUT</Menu.Label>
                <Menu.Item
                  to="/about"
                  color="orange"
                  component={Link}
                  icon={<InfoCircle size={14} />}
                >
                  About TheCurrent
                </Menu.Item>
              </Menu>
              <div id="navbar-end-2" className="navbar-end ml-2">
                <div className="navbar-item">
                  <div className="buttons">
                    {/* LOGIN BUTTON */}
                    <button
                      onClick={() => {
                        navigate("/login");
                      }}
                      className="login-button button is-link is-light is-size-7 has-text-weight-semibold"
                    >
                      <Login size={18} className="mr-1" />
                      Log in
                    </button>

                    {/* ABOUT US BUTTON - FOR VIEWERS */}
                    <button
                      onClick={() => {
                        navigate("/about");
                      }}
                      className="about-button button is-warning is-size-7 has-text-weight-semibold"
                    >
                      <InfoCircle size={18} className="mr-1" />
                      About Us
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>

      {/* LOWER NAVBAR SECTION - NEWS CATEGORIES */}
      <nav
        className="breadcrumb has-background-white is-small is-flex is-justify-content-center is-align-items-center has-bullet-separator"
        aria-label="breadcrumbs"
      >
        <ul className="m-0 px-0 py-2 is-flex is-justify-content-center is-align-items-center">
          <li>
            <Link className="has-text-weight-semibold" to={"/#latest"}>
              Latest
            </Link>
          </li>
          <CategoryItem />
        </ul>
      </nav>
    </div>
  );
}
