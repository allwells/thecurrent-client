import "./Blog.css";

import { Card, Modal, Offcanvas } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaShare } from "react-icons/fa";
import Footer from "../Footer/Footer";
import { Loader } from "@mantine/core";
import { MdContentCopy } from "react-icons/md";
import NavBar from "../NavBar/NavBar";
import Purify from "../../utils/Purify";
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
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

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
      .get(`${process.env.REACT_APP_BASE_URL}/post/${id}`)
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

  // const handleLike = (id) => {
  //   if (loggedIn) {
  //     if (!liked) {
  //       axios
  //         .post(`${process.env.REACT_APP_BASE_URL}/api/user/post/like/${id}`, {
  //           user_id: userId,
  //         })
  //         .then((res) => {
  //           setBlog(res.data.blog);
  //           if (loggedIn) {
  //             // eslint-disable-next-line
  //             res.data.blog.likes.map((like) => {
  //               if (like === userId) {
  //                 setLiked(true);
  //               }
  //             });
  //           }
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     } else {
  //       axios
  //         .post(
  //           `${process.env.REACT_APP_BASE_URL}/api/user/post/unlike/${id}`,
  //           {
  //             user_id: userId,
  //           }
  //         )
  //         .then((res) => {
  //           setBlog(res.data.blog);
  //           if (loggedIn) {
  //             // eslint-disable-next-line
  //             res.data.blog.likes.map((like) => {
  //               if (like === userId) {
  //                 setLiked(true);
  //               }
  //             });
  //             setLiked(false);
  //           }
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   }
  // };

  // const addComment = (id) => {
  //   axios
  //     .post(`${process.env.REACT_APP_BASE_URL}/api/user/post/comment/${id}`, {
  //       user_id: userId,
  //       comment: document.getElementById("comment").value,
  //     })
  //     .then((res) => {
  //       setBlog(res.data.blog);
  //       document.getElementById("comment").value = "";
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <>
      <NavBar />
      <div className="blog-container">
        {loading ? (
          <div className="loader">
            <Loader size="lg" variant="bars" />
          </div>
        ) : (
          <>
            {/* <div className="utilities">
              {loggedIn ? (
                <>
                  <div
                    className={`utility-item like ${liked ? "liked" : ""}`}
                    onClick={() => {
                      handleLike(id);
                    }}
                  >
                    <AiOutlineHeart />{" "}
                    <span>{blog.likes ? blog.likes.length : 0}</span>
                  </div>
                  <div className="utility-item comment" onClick={handleShow}>
                    <FaRegComment />{" "}
                    <span>{blog.comments ? blog.comments.length : 0}</span>
                  </div>
                  <div className="utility-item share" onClick={handleModalShow}>
                    <FaShare />
                  </div>
                </>
              ) : (
                <div className="account-alert">Login to like and comment</div>
              )}
            </div> */}
            <div className="blog">
              <Card>
                {blog.cloudinaryId ? (
                  <Card.Img className="blog-image" src={blog.image} />
                ) : null}
                <Card.Body>
                  <div className="postHeader">
                    <div className="dateCategory">
                      <span className="date">
                        {new Date(blog.created_at).toDateString()}
                      </span>

                      <span
                        className="category"
                        onClick={() => console.log("Category clicked!")}
                      >
                        {Purify(blog.category)}
                      </span>
                    </div>

                    <div
                      className="utility-item share"
                      onClick={handleModalShow}
                    >
                      <FaShare />
                    </div>
                  </div>
                  <h1>{blog.title}</h1>
                  <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  ></div>
                </Card.Body>
              </Card>
            </div>
            <Offcanvas show={show} placement="end" onHide={handleClose}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Discussion</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {/* <div className="comment-box">
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      addComment(id);
                    }}
                  >
                    <Form.Group>
                      <Form.Label>Add New Comment</Form.Label>
                      <Form.Control id="comment" as="textarea" rows="3" />
                    </Form.Group>
                    <Button variant="success" type="submit" className="mt-3">
                      Comment
                    </Button>
                  </Form>
                </div> */}
                {/* <div className="comment-container">
                  {blog.comments ? (
                    blog.comments.reverse().map((comment) => {
                      return (
                        <Card className="comment" key={comment._id}>
                          <div className="comment-author">{comment.name}</div>
                          <div className="comment-date">
                            {new Date(comment.date).toDateString()}
                          </div>
                          <div className="comment-content">
                            {comment.comment}
                          </div>
                        </Card>
                      );
                    })
                  ) : (
                    <div>No comments yet</div>
                  )}
                </div> */}
              </Offcanvas.Body>
            </Offcanvas>
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
