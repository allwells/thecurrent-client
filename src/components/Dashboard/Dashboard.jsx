import "./Dashboard.css";

import { Button, Loader, Tabs } from "@mantine/core";
import { CirclePlus, LayoutDashboard, Settings } from "tabler-icons-react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import CreatePost from "../CreatePost/CreatePost";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import NewsCardSmall from "../NewsCards/NewsCardSmall";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useViewportSize } from "@mantine/hooks";

export default function Dashboard() {
  const navigate = useNavigate();
  const viewPort = useViewportSize();

  const mobileDeviceScreenWidth = 768;

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
        .post(`${process.env.REACT_APP_BASE_URL}/dashboard`, {
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
        <Tabs color="indigo" position="left" tabPadding="xl" grow>
          <Tabs.Tab label="Dashboard" icon={<LayoutDashboard size={14} />}>
            Dashboard
          </Tabs.Tab>
          <Tabs.Tab label="Create" icon={<CirclePlus size={14} />}>
            <CreatePost />
          </Tabs.Tab>
          <Tabs.Tab label="Settings" icon={<Settings size={14} />}>
            Settings
          </Tabs.Tab>
        </Tabs>
      </div>

      {/* <div className="dashboard-container">
        <div
          style={{
            position:
              viewPort >= mobileDeviceScreenWidth ? "static" : "relative",
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
            </Button> */}
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
      {/* <Button
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
        </div> */}
      {/* {loading ? (
          <div className="loadingIndicator is-flex is-justify-content-center is-align-items-center">
            <Loader color={"#485FC7"} size="sm" variant="bars" />
          </div>
        ) : (
          <div className="dashboard-blogs">
            {isBlog ? (
              <>
                <h1 className="title is-3">Your Posts</h1>
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
      </div> */}
      <Toaster />
      <Footer />
    </>
  );
}
