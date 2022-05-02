import "./Dashboard.css";

import {
  CirclePlus,
  LayoutDashboard,
  Settings as SettingsIcon,
} from "tabler-icons-react";
import { Loader, Tabs } from "@mantine/core";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import CreatePost from "../CreatePost/CreatePost";
import DashboardNewsCards from "./DashboardNewsCards";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import Settings from "../Setting/Settings";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const notifySuccess = () => toast.success("Deleted Successfully!");
  const notifyError = (message) => toast.error(message);

  // eslint-disable-next-line
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [blogs, setBlogs] = useState([]);
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

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <>
      <NavBar />

      <div className="dashboard-container">
        <Tabs color="indigo" position="left" tabPadding="xl" grow>
          <Tabs.Tab
            id="tab"
            className="post-tab"
            label="Dashboard"
            icon={<LayoutDashboard size={14} />}
          >
            <DashboardContent
              loading={loading}
              blogs={blogs}
              email={email}
              handlePost={handlePost}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </Tabs.Tab>
          <Tabs.Tab id="tab" label="Create" icon={<CirclePlus size={14} />}>
            <CreatePost />
          </Tabs.Tab>
          <Tabs.Tab id="tab" label="Settings" icon={<SettingsIcon size={14} />}>
            <Settings />
          </Tabs.Tab>
        </Tabs>
      </div>

      <Toaster />
      <Footer />
    </>
  );
}

const DashboardContent = ({
  loading,
  blogs,
  email,
  handlePost,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="dashboard-posts is-flex is-flex-direction-column is-justify-content-flex-start is-align-items-center">
      <div className="dashboard-details-container mb-4 is-flex is-full">
        {/* Dashboard details section */}
        <div className="dashboard-details is-flex is-flex-direction-column is-justify-content-flex-start is-align-items-center">
          {/* email of post label */}
          <span className="total-posts-label mb-2 is-uppercase has-text-grey">
            Email
          </span>
          <span className="total-posts-value has-text-weight-semibold subtitle is-6">
            {email}
          </span>
        </div>

        {/* Dashboard details section */}
        <div className="dashboard-details is-flex is-flex-direction-column is-justify-content-flex-start is-align-items-center">
          {/* total number of post label */}
          <span className="total-posts-label mb-2 is-uppercase has-text-grey">
            Total posts published
          </span>
          {/* Total number of posts */}
          <span className="total-posts-value title is-2">{blogs.length}</span>
        </div>
      </div>

      {loading ? (
        <div className="loadingIndicator is-flex is-justify-content-center is-align-items-center">
          <Loader color={"#485FC7"} size="sm" variant="bars" />
        </div>
      ) : (
        <div className="mt-5 is-flex is-flex-direction-column is-justify-content-flex-start is-align-items-center">
          <h1 className="title is-5 has-text-dark">Your Posts</h1>
          <div
            id="post-container"
            className="is-flex is-flex-direction-column is-justify-content-flex-start is-align-items-center"
          >
            {blogs.map((blog) => {
              return (
                <DashboardNewsCards
                  blog={blog}
                  key={blog._id}
                  handlePost={handlePost}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
