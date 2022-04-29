import "./Dashboard.css";

import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { Button } from "@mantine/core";
import Footer from "../Footer/Footer";
import { Loader } from "@mantine/core";
import NavBar from "../NavBar/NavBar";
import NewsCardSmall from "../NewsCards/NewsCardSmall";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useViewportSize } from "@mantine/hooks";

export default function Dashboard() {
  const navigate = useNavigate();
  const viewPort = useViewportSize();

  const notifySuccess = () => toast.success("Deleted Successfully!");
  const notifyError = (message) => toast.error(message);

  // eslint-disable-next-line
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [isBlog] = useState(true);
  const [loading, setLoading] = useState(true);

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
  }, [navigate, setName, setEmail, setBlogs]);

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
        notifySuccess();
        setBlogs(res.data.blogs.reverse());
      })
      .catch((err) => {
        notifyError(err.response.data.error);
        if (err.response.status === 401) {
          navigate("/login");
        }
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <>
      <NavBar />
      <div className="dashboard-container">
        <div
          style={{
            position: viewPort >= 768 ? "static" : "relative",
          }}
          className="dashboard-card"
        >
          <div className="card">
            <div className="card-header">Dashboard</div>
            <div className="card-body">
              <div className="basic-dashboard">
                <div>
                  <div className="user-email">{email}</div>
                  <div className="user-info">
                    Posts Published - {blogs.length}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tab">
            <Button
              fullWidth
              radius="sm"
              color="dark"
              variant="default"
              className="tab-buttons"
              onClick={() => navigate("/create")}
            >
              Create Post
            </Button>
            {/* <Button
              fullWidth
              radius="sm"
              color="dark"
              variant="default"
              className="tab-buttons"
              onClick={() => navigate("/setting")}
            >
              Settings
            </Button> */}
            <Button
              fullWidth
              radius="sm"
              color="dark"
              variant="default"
              className="tab-buttons"
              onClick={() => logout()}
            >
              Logout
            </Button>
          </div>
        </div>
        {loading ? (
          <div className="loader">
            <Loader size="sm" variant="bars" />
          </div>
        ) : (
          <div className="dashboard-blogs">
            {isBlog ? (
              <>
                <h1 className="">Your Posts</h1>
                <div>
                  {blogs.map((blog) => {
                    return (
                      <NewsCardSmall
                        blog={blog}
                        key={blog._id}
                        isDashboard={true}
                        handlePost={handlePost}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                      />
                    );
                  })}
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>
      <Toaster />
      <Footer />
    </>
  );
}
