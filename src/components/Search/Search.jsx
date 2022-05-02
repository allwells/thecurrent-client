import "./Search.css";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardNewsCards from "../Dashboard/DashboardNewsCards";
import Footer from "../Footer/Footer";
import { Loader } from "@mantine/core";
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
        <h1 className="main-heading mt-5 subtitle is-6">
          Showing results for "{query}"
        </h1>
        {loading ? (
          <div className="loading">
            <Loader size="md" variant="bars" color={"#485FC7"} />
          </div>
        ) : (
          <div className="container">
            {blogs.length > 0 ? (
              blogs.map((blog) => {
                return (
                  <DashboardNewsCards
                    key={blog._id}
                    blog={blog}
                    query={query}
                    isDashboard={false}
                    handlePost={handlePost}
                  />
                );
              })
            ) : (
              <>
                <h1 className="subtitle is-6">
                  Sorry, we couldn't find anything for “{query}”
                </h1>
              </>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
