import "./Search.css";

import { Card, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AiOutlineHeart } from "react-icons/ai";
import { BallTriangle } from "react-loader-spinner";
import { FaRegComment } from "react-icons/fa";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
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
        setBlogs(res.data.blogs);
        setInterval(() => {
          setLoading(false);
        }, 800);
      })
      .catch((err) => {
        console.log(err);
        setInterval(() => {
          setLoading(false);
        }, 800);
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
        { loading ? (
        <div className="loader">
          <BallTriangle
            radius="4px"
            color="#368DD6"
            ariaLabel="loading-indicator"
          />
        </div>
        ) : (
        <Container>
          {blogs.length > 0 ? (
            blogs.reverse().map((blog) => {
              return (
                <Card
                  className="blog-card"
                  key={blog._id}
                  onClick={() => {
                    handlePost(blog._id);
                  }}
                >
                  {blog.cloudinaryId ? (
                    <Card.Img variant="top" src={blog.image} />
                  ) : null}
                  <Card.Body>
                    <h1>{blog.title}</h1>
                    <div className="blog-info">{blog.author}</div>
                    <div className="blog-info">
                      {new Date(blog.created_at).toDateString()}
                    </div>
                    <div className="blog-items">
                      <span>
                        <AiOutlineHeart /> {blog.likes.length} Reactions
                      </span>
                      <span>
                        <FaRegComment /> {blog.comments.length} Comments
                      </span>
                    </div>
                  </Card.Body>
                </Card>
              );
            })
          ) : (
            <>
              <h1>No Blogs for given search</h1>
            </>
          )}
        </Container>
        )}
      </div>
      <Footer />
    </>
  );
}
