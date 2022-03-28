import "./Search.css";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Container } from "react-bootstrap";
import Footer from "../Footer/Footer";
import { Loader } from "@mantine/core";
import NavBar from "../NavBar/NavBar";
import NewsCardSmall from "../NewsCards/NewsCardSmall";
import axios from "axios";

export default function Search() {
  const navigate = useNavigate();

  const { query } = useParams();

  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/search/${query}`)
      .then((res) => {
        setBlogs(res.data.blogs.reverse());
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
      });
  }, [query]);

  const handlePost = (id) => {
    navigate(`/news/${id}`);
  };

  return (
    <>
      <NavBar />
      <div className="search-container">
        <h1 className="main-heading">Showing results for "{query}"</h1>
        {loading ? (
          <div className="loader">
            <Loader size="sm" variant="bars" />
          </div>
        ) : (
          <Container>
            {blogs.length > 0 ? (
              blogs.map((blog) => {
                return (
                  <NewsCardSmall
                    key={blog._id}
                    blog={blog}
                    query={query}
                    handlePost={handlePost}
                  />
                );
              })
            ) : (
              <>
                <h1 className="message">
                  Sorry, we couldn't find anything for “{query}”
                </h1>
              </>
            )}
          </Container>
        )}
      </div>
      <Footer />
    </>
  );
}
