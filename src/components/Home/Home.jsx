import "./Home.css";

import { Card, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import { Button } from "@mantine/core";
import CategoryBadge from "../Badge/CategoryBadge";
import DatePublished from "../DatePublished/DatePublished";
import Footer from "../Footer/Footer";
import { Loader } from "@mantine/core";
import NavBar from "../NavBar/NavBar";
import NewsCard from "../NewsCards/NewsCard";
import NewsCardSmall from "../NewsCards/NewsCardSmall";
import Purify from "../../utils/Purify";
import SelectForm from "../SelectForm/SelectForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    const fetchPosts = () => {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/posts`)
        .then((res) => {
          setBlogs(res.data.blogs.reverse().slice(5));
          setLatestNews(
            res.data.blogs
              .reverse()
              .slice(-5)
              .reverse()
          );
          setLoading(!loading);
        })
        .catch((err) => {
          // set error, to display to user
          // console.log(err);
        });
    };
    fetchPosts();
  }, []);

  const handlePost = (id) => {
    navigate(`/news/${id}`);
  };

  return (
    <>
      <NavBar />
      <div className="home-container">
        <h2 id="latest" className="title is-4 mb-4">
          Latest news
        </h2>
        <div className="latest-news">
          {latestNews.length > 0
            ? latestNews.map((blog) => {
                return (
                  <NewsCard
                    key={blog._id}
                    blog={blog}
                    onClick={() => {
                      handlePost(blog._id);
                    }}
                  />
                );
              })
            : null}
        </div>
        {loading ? (
          <div className="b-0 is-flex is-justify-content-center is-align-items-center">
            <Loader color={"#485FC7"} size="md" variant="bars" />
          </div>
        ) : (
          // EXPLORE NEWS SECTION
          <div className="container">
            <h1 id="explore" className="title is-4 mt-5 mb-3" align="center">
              Explore
            </h1>
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
              <>
                <h1 className="no-post">No Post Available</h1>
              </>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
