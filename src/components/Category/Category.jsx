import "./Category.css";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Container } from "react-bootstrap";
import Footer from "../Footer/Footer";
import { Loader } from "@mantine/core";
import NavBar from "../NavBar/NavBar";
import NewsCardSmall from "../NewsCards/NewsCardSmall";
import Purify from "../../utils/Purify";
import axios from "axios";

const Category = () => {
  const navigate = useNavigate();

  const { query } = useParams();

  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/category/${query}`)
      .then((res) => {
        setBlogs(res.data.blogs.reverse());
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [query]);

  const handlePost = (id) => {
    navigate(`/news/${id}`);
  };

  return (
    <>
      <NavBar />
      <div className="category-container">
        <h1
          align="center"
          className="my-5 is-size-5 has-text-weight-semibold is-uppercase"
        >
          {Purify(query)}
        </h1>
        {loading ? (
          <div className="b-0 is-flex is-justify-content-center is-align-items-center">
            <Loader color={"#485FC7"} size="md" variant="bars" />
          </div>
        ) : (
          <Container>
            {blogs.length > 0 ? (
              blogs.map((blog) => {
                return (
                  <NewsCardSmall
                    key={blog._id}
                    blog={blog}
                    handlePost={handlePost}
                  />
                );
              })
            ) : (
              <h1 align="center" className="subtitle is-6">
                No content available.
              </h1>
            )}
          </Container>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Category;

// <h1 className="subtitle is-6">
//   Sorry, we couldn't find any news post under{" "}
//   <span className="is-capitalized">
//     “{Purify(query)}”
//   </span>
// </h1>
