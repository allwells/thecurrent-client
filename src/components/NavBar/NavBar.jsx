import "./NavBar.css";

import {
  Container,
  Form,
  FormControl,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";

import { Button } from "@mantine/core";
import Identicon from "react-identicons";
import { Search } from "tabler-icons-react";
import anchorLogo from "../../img/anchor-logo.png";
import axios from "axios";
import thecurrentLogo from "../../img/thecurrent-logo.png";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  // eslint-disable-next-line
  const [name, setName] = useState("");
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

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${query}`);
  };

  return (
    <>
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
                  className="search-button"
                  type="submit"
                  variant="subtle"
                  size="sm"
                >
                  <Search color="#368dd6" size={20} />
                </Button>
              </Form>
            </Nav>

            {loggedIn ? (
              <Nav>
                {/* <Nav.Link>
                  <Button
                    variant="success"
                    className="new-post"
                    onClick={() => {
                      navigate("/new");
                    }}
                  >
                    Create New Post
                  </Button>
                </Nav.Link> */}
                <NavDropdown
                  style={{
                    textAlign: "left",
                  }}
                  align={{ lg: "end" }}
                  title={
                    <Identicon className="user-icon" string={email} size={35} />
                  }
                >
                  <NavDropdown.Item
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => {
                      navigate("/new");
                    }}
                  >
                    Create Post
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link>
                  <Button
                    variant="outine"
                    className="login"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </Button>
                </Nav.Link>
                {/* <Nav.Link>
                  <Button
                    variant="success"
                    className="signup"
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    Signup
                  </Button>
                </Nav.Link> */}
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
