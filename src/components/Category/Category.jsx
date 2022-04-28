import "./Category.css";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
    const fetchPosts = () => {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/category/${query}`)
        .then((res) => {
          setBlogs(res.data.blogs.reverse());

          setLoading(false);
        })
        .catch((err) => {
          // set error, to display to user
          // console.log(err);
        });
    };

    fetchPosts();
  }, [query]);

  const handlePost = (id) => {
    navigate(`/news/${id}`);
  };

  return (
    <>
      <NavBar />
      <div className="category-container is-flex is-flex-direction-column is-justify-content-flex-start is-align-items-center">
        <h1
          align="center"
          className="mt-6 mb-4 is-size-5 has-text-weight-semibold is-uppercase"
        >
          {Purify(query)}
        </h1>
        {loading ? (
          <div className="b-0 is-flex is-justify-content-center is-align-items-center">
            <Loader color={"#485FC7"} size="md" variant="bars" />
          </div>
        ) : (
          <div className="category-sub-container is-full is-flex-wrap-wrap is-flex is-justify-content-center">
            {blogs.length > 0 ? (
              blogs.map((blog) => {
                // if (blog.category === query) {
                return (
                  <NewsCardSmall
                    key={blog._id}
                    blog={blog}
                    handlePost={handlePost}
                  />
                );
                // } else {
                //   return null;
                // }
              })
            ) : (
              <h1 align="center" className="no-content subtitle is-6">
                No content available.
              </h1>
            )}
          </div>
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
