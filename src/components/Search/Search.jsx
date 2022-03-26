import "./Search.css";

import { Card, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@mantine/core";
import Footer from "../Footer/Footer";
import { Highlight } from "@mantine/core";
import { Loader } from "@mantine/core";
import NavBar from "../NavBar/NavBar";
import Purify from "../../utils/Purify";
import axios from "axios";

export default function Search() {
  const navigate = useNavigate();

  const { query } = useParams();

  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/user/search/${query}`)
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
    navigate(`/blog/${id}`);
  };

  return (
    <>
      <NavBar />
      <div className="search-container">
        <h1 className="main-heading">Results For Your Search</h1>
        {loading ? (
          <div className="loader">
            <Loader size="lg" variant="bars" />
          </div>
        ) : (
          <Container>
            {blogs.length > 0 ? (
              blogs.map((blog) => {
                return (
                  <Card className="blog-card" key={blog._id}>
                    {blog.cloudinaryId ? (
                      <Card.Img variant="top" src={blog.image} />
                    ) : null}
                    <Card.Body>
                      <h1>
                        <Highlight className="blog-title" highlight={query}>
                          {blog.title}
                        </Highlight>
                      </h1>
                      <div className="createdAt">
                        <span className="date">
                          {new Date(blog.created_at).toDateString()}
                        </span>
                        <span
                          className="category"
                          onClick={() => console.log("Category clicked!")}
                        >
                          {Purify(blog.category)}
                        </span>
                      </div>
                      <div className="blog-items">
                        <Button
                          className="readMore"
                          onClick={() => {
                            handlePost(blog._id);
                          }}
                        >
                          Read More
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
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
