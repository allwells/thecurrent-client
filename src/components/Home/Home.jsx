import "./Home.css";

import React, { useEffect, useState } from "react";

import Footer from "../Footer/Footer";
import { Loader } from "@mantine/core";
import NavBar from "../NavBar/NavBar";
import NewsCard from "../NewsCards/NewsCard";
import NewsCardSmall from "../NewsCards/NewsCardSmall";
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
        <div className="latest-news">
          {latestNews.length > 0 ? (
            <div className="">
              <h2 id="latest" className="title is-4 mb-4">
                Latest news
              </h2>

              <div className="is-full is-flex is-justify-content-space-between is-flex-wrap-wrap">
                {/* DISPLAY LATEST NEWS */}
                {latestNews.map((blog) => {
                  return (
                    <NewsCard
                      key={blog._id}
                      blog={blog}
                      onClick={() => {
                        handlePost(blog._id);
                      }}
                    />
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
        {loading ? (
          <div className="b-0 is-flex is-justify-content-center is-align-items-center">
            <Loader color={"#485FC7"} size="md" variant="bars" />
          </div>
        ) : (
          // EXPLORE NEWS SECTION
          <div className="container">
            {blogs.length > 0 ? (
              <>
                <h1
                  id="explore"
                  align="center"
                  className="title is-4 mt-5 mb-3"
                >
                  Explore
                </h1>
                {/* MAP blogs ARRAY AND GET BLOGS */}
                {blogs.map((blog) => {
                  return (
                    <NewsCardSmall
                      key={blog._id}
                      blog={blog}
                      handlePost={handlePost}
                    />
                  );
                })}
              </>
            ) : (
              <h1 align="center" className="subtitle is-5">
                No content available.
              </h1>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
