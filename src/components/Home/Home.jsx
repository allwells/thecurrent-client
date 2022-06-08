import "./Home.css";

import React, { useEffect, useState } from "react";

import CategoryBadge from "../Badge/CategoryBadge";
import DatePublished from "../DatePublished/DatePublished";
import Footer from "../Footer/Footer";
import { Loader } from "@mantine/core";
import NavBar from "../NavBar/NavBar";
import NewsCard from "../NewsCards/NewsCard";
import NewsCardSmall from "../NewsCards/NewsCardSmall";
import { Pin as PinnedIcon } from "tabler-icons-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [pinned] = useState([]);

  useEffect(() => {
    const fetchPosts = () => {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/news`)
        .then((res) => {
          setBlogs(res.data.blogs.reverse().slice(5));
          setLatestNews(
            res.data.blogs
              .reverse()
              .slice(-5)
              .reverse()
          );

          setLoading(false);
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
              <div className="is-full is-flex is-flex-direction-column is-justify-content-space-between is-flex-wrap-wrap mb-4">
                <span className="has-text-grey is-size-7 is-uppercase has-text-weight-bold mb-2">
                  <PinnedIcon size={11} color="#777" /> Pinned Post
                </span>

                <div className="is-full is-flex is-justify-content-space-between is-flex-wrap-wrap mb-4">
                  {pinned.map((pin) => {
                    if (pin._id === "627b91cbbba11933e07b1846") {
                      return (
                        <div
                          key={pin._id}
                          style={{
                            backgroundImage: `url(${pin.image})`,
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                          }}
                          className="news-card"
                        >
                          <div className="tint p-4 is-flex is-flex-direction-column is-justify-content-space-between is-align-items-flex-start">
                            {/* HASHTAG - NEWS CATEGORY */}
                            <div className="category-tag is-full is-flex is-justify-content-end">
                              <CategoryBadge blog={pin} />
                            </div>

                            <div className="is-full">
                              {/* DATE */}
                              <DatePublished blog={pin} />

                              {/* CARD TITLE */}
                              <h3
                                onClick={() => {
                                  handlePost(pin._id);
                                }}
                                className="title is-6 has-text-light"
                              >
                                {pin.title}
                              </h3>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>

              <h2 id="latest" className="title is-4 mb-4">
                Latest news
              </h2>

              <div className="is-full is-flex is-justify-content-space-between is-flex-wrap-wrap">
                {/* DISPLAY LATEST NEWS */}
                {latestNews.map((blog) => {
                  if (blog._id === "627b91cbbba11933e07b1846") {
                    // eslint-disable-next-line
                    pinned.push(blog);
                  } else {
                    return (
                      <NewsCard
                        key={blog._id}
                        blog={blog}
                        onClick={() => {
                          handlePost(blog._id);
                        }}
                      />
                    );
                  }
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
          <div
            id="explore"
            className="container is-flex is-justify-content-center is-align-items-center is-flex-direction-column mb-6 pt-5"
          >
            {blogs.length > 0 ? (
              <h1
                align="left"
                style={{ width: "100%" }}
                className="title is-4 mt-5 pl-2 mb-4"
              >
                Explore
              </h1>
            ) : null}
            {blogs.length > 0 ? (
              /* MAP 'blogs' ARRAY AND GET BLOGS */
              <div
                id="news-cards"
                className="is-full is-flex-wrap-wrap is-flex is-justify-content-stretch"
              >
                {blogs.map((blog) => {
                  return (
                    <NewsCardSmall
                      key={blog._id}
                      blog={blog}
                      handlePost={handlePost}
                    />
                  );
                })}
              </div>
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
