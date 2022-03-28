import "./Profile.css";

import React, { useEffect, useState } from "react";

import { AiOutlineHeart } from "react-icons/ai";
import { Card } from "react-bootstrap";
import { FaRegComment } from "react-icons/fa";
import Footer from "../Footer/Footer";
// import Identicon from "react-identicons";
import { Loader } from "@mantine/core";
import NavBar from "../NavBar/NavBar";
import NewsCardSmall from "../NewsCards/NewsCardSmall";
import Notify from "../Notification/Notify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [isBlog] = useState(true);
  const [loading, setLoading] = useState(true);
  const [notify, setNotify] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/profile`, {
          token: localStorage.getItem("token"),
        })
        .then((res) => {
          setName(res.data.name);
          setEmail(res.data.email);
          setBlogs(res.data.blogs.reverse());
          setLikedBlogs(res.data.likedBlogs);
          setLoading(!loading);
        })
        .catch((err) => {
          setLoading(!loading);
          navigate("/login");
        });
    } else {
      setInterval(() => {
        setLoading(false);
      }, 1000);
      navigate("/login");
    }
  }, [navigate, setName, setEmail, setBlogs, setLikedBlogs]);

  const handlePost = (id) => {
    navigate(`/news/${id}`);
  };

  const handleDelete = (id) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/delete`, {
        token: localStorage.getItem("token"),
        id: id,
      })
      .then((res) => {
        setBlogs(res.data.blogs.reverse());
        setLikedBlogs(res.data.likedBlogs);
        setNotify(true);

        setTimeout(() => {
          setNotify(false);
        }, 3000);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/login");
        }
      });
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <>
      <NavBar />
      <div className="profile-container">
        <div className="profile-card">
          <Card>
            <Card.Header>Profile</Card.Header>
            <Card.Body>
              <div className="basic-profile">
                {/* <Identicon className="user-icon" string={email} size={85} /> */}
                <div>
                  <div className="user-email">{email}</div>
                  <div className="user-info">
                    Posts Published - {blogs.length}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        {loading ? (
          <div className="loader">
            <Loader size="sm" variant="bars" />
          </div>
        ) : (
          <div className="profile-blogs">
            {isBlog ? (
              <>
                <h1 className="main-heading">Your Posts</h1>
                <div>
                  {blogs.map((blog) => {
                    return (
                      <NewsCardSmall
                        blog={blog}
                        key={blog._id}
                        profile={true}
                        handlePost={handlePost}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                      />
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <h1 className="main-heading">Liked Blogs</h1>
                <div>
                  {likedBlogs.map((blog) => {
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
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <Notify notify={notify} title="Post deleted successfully!" />
      <Footer />
    </>
  );
}
