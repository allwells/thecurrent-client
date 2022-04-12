import "./NavBar.css";

import { Burger, Button } from "@mantine/core";
import { Container, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import ExtendedNav from "./ExtendedNav";
import { Search } from "tabler-icons-react";
import anchorLogo from "../../img/anchor-logo.png";
import axios from "axios";
import thecurrentLogo from "../../img/thecurrent-logo.png";
import { useNavigate } from "react-router-dom";
import { useViewportSize } from "@mantine/hooks";

export default function NavBar() {
  const navigate = useNavigate();
  const viewPort = useViewportSize();

  const [loggedIn, setLoggedIn] = useState(false);
  // eslint-disable-next-line
  const [name, setName] = useState("");
  // eslint-disable-next-line
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [opened, setOpened] = useState(false);

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

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${query}`);
  };

  return (
    <>
      <ExtendedNav
        opened={opened}
        loggedIn={loggedIn}
        closeButton={() => setOpened((o) => !o)}
      />
      <Navbar collapseOnSelect expand="lg" sticky="top" variant="light">
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={anchorLogo} height={35} alt="logo" />
            <img src={thecurrentLogo} height={35} alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            {/* Search Bar */}
            <Nav className="searchBar">
              <Form
                className="d-flex"
                onSubmit={(e) => {
                  handleSearch(e);
                }}
              >
                <FormControl
                  value={query}
                  type="search"
                  aria-label="Search"
                  placeholder="Search"
                  className="me-2 w-100"
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                />
                <Button
                  size="sm"
                  type="submit"
                  variant="subtle"
                  className="search-button"
                >
                  <Search color="#368dd6" size={20} />
                </Button>
              </Form>
            </Nav>

            {loggedIn ? (
              viewPort.width <= 768 ? (
                <Button
                  fullWidth
                  radius="xl"
                  variant="outline"
                  style={{ marginTop: "1rem" }}
                  onClick={() => setOpened((o) => !o)}
                >
                  Menu
                </Button>
              ) : (
                <Burger
                  color="#368dd6"
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                />
              )
            ) : (
              <Nav>
                <Nav.Link>
                  <Button
                    compact
                    radius="lg"
                    size="lg"
                    variant="outline"
                    className="login-button"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </Button>
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
