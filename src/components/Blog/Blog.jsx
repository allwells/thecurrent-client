import "./Blog.css";

import { Card, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import Author from "../Author/Author";
import CategoryBadge from "../Badge/CategoryBadge";
import { CopyToClipboard } from "react-copy-to-clipboard";
import DatePublished from "../DatePublished/DatePublished";
import { FaShare } from "react-icons/fa";
import Footer from "../Footer/Footer";
import { Loader } from "@mantine/core";
import { MdContentCopy } from "react-icons/md";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Blog() {
  const { id } = useParams();

  const location = window.location.href;

  const [blog, setBlog] = useState({});
  const [setLiked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/data`, {
          token: localStorage.getItem("token"),
        })
        .then((res) => {
          setLoggedIn(true);
          setUserId(res.data.id);
        })
        .catch((err) => {
          localStorage.removeItem("token");
          setLoggedIn(false);
        });
    }

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/news/${id}`)
      .then((res) => {
        setBlog(res.data.blog);
        if (loggedIn) {
          // eslint-disable-next-line
          res.data.blog.likes.map((like) => {
            if (like === userId) {
              setLiked(true);
            }
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err);
      });
  }, [id, loggedIn, userId]);

  return (
    <>
      <NavBar />
      <div className="blog-container">
        {loading ? (
          <div className="loading">
            <Loader size="sm" variant="bars" color={"#485FC7"} />
          </div>
        ) : (
          <>
            <div className="blog">
              <div className="card">
                <h1 className="title is-3">{blog.title}</h1>
                <div className="postHeader">
                  <div className="dateCategory">
                    <DatePublished blog={blog} />
                    <span id="divider"></span>
                    <CategoryBadge blog={blog} />
                    <span id="divider"></span>
                    <Author blog={blog} />
                  </div>

                  <div className="utility-item share" onClick={handleModalShow}>
                    <FaShare />
                  </div>
                </div>
                {blog.cloudinaryId ? (
                  <Card.Img className="blog-image" src={blog.image} />
                ) : null}

                <Card.Body>
                  <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  ></div>
                </Card.Body>
              </div>
            </div>
            <Modal
              className="copy-link"
              show={showModal}
              onHide={handleModalClose}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Copy Link</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="copy-link-container">
                  <span className="url">{location}</span>{" "}
                  <CopyToClipboard
                    text={location}
                    className="copy"
                    onCopy={() => {
                      setCopied(true);
                      setTimeout(() => {
                        setCopied(false);
                      }, 1000);
                    }}
                  >
                    <MdContentCopy />
                  </CopyToClipboard>
                </div>
                {copied ? (
                  <div className="copied-text">
                    <span>Copied to clipboard</span>
                  </div>
                ) : null}
              </Modal.Body>
            </Modal>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
