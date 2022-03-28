import "./EditPost.css";

import { Button, Card, Container, Form, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@aaditya1978/ckeditor5-build-classic";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import Notify from "../Notification/Notify";
import SelectForm from "../SelectForm/SelectForm";
import axios from "axios";

export default function EditPost() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [imageName, setImageName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [notify, setNotify] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/user/post/${id}`)
      .then((res) => {
        setTitle(res.data.blog.title);
        setCategory(res.data.blog.category);
        setAuthor(res.data.blog.author);
        setContent(res.data.blog.content);
        setImageData(res.data.blog.image);
        setImage(res.data.blog.image);
      })
      .catch((err) => {
        navigate("/login");
      });
  }, [navigate, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const sanitizeContent = content.trim();
    if (sanitizeContent.length < 200) {
      setError(true);
      setErrorMessage("Content must be at least 200 characters long");
      setSubmitting(false);
      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 5000);
      return;
    }
    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("author", author);
    formData.append("category", category);
    formData.append("content", sanitizeContent);
    formData.append("image", imageData);
    formData.append("date", new Date());
    formData.append("token", localStorage.getItem("token"));

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/edit`, formData)
      .then((res) => {
        setSubmitting(false);
        setNotify(true);

        setInterval(() => {
          setNotify(false);
          navigate("/profile");
        }, 3000);
      })
      .catch((err) => {
        setSubmitting(false);
        setError(true);
        setErrorMessage(err.response.data.error);
        if (err.response.status === 401) {
          navigate("/login");
        }
      });
  };

  return (
    <>
      <NavBar />
      <div className="editpost-container">
        <Container>
          <Card>
            <Card.Body>
              <h1 className="heading">Edit Post</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <SelectForm category={category} setCategory={setCategory} />
                  <Form.Label>Add Cover Image</Form.Label>
                  <Form.Control
                    type="File"
                    accept="image/*"
                    value={imageName}
                    onChange={(e) => {
                      setImage(URL.createObjectURL(e.target.files[0]));
                      setImageData(e.target.files[0]);
                      setImageName(e.target.value);
                    }}
                    name="image"
                  />
                  {image && (
                    <img className="img-preview" src={image} alt="preview" />
                  )}
                  <br />
                  {image && (
                    <Button
                      variant="primary"
                      className="remove-image"
                      onClick={() => {
                        setImage(null);
                        setImageData(null);
                        setImageName("");
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    className="postTitle"
                    placeholder="Post Title Here"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    required
                  />
                </Form.Group>
                <CKEditor
                  editor={ClassicEditor}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setContent(data);
                  }}
                  data={content}
                  config={{
                    placeholder: "Start typing your blog here...",
                  }}
                />
                <Button
                  type="submit"
                  variant="success"
                  className="mt-3 submit"
                  {...(submitting ? { disabled: true } : {})}
                >
                  {submitting ? (
                    <Spinner as="span" animation="border" role="status" />
                  ) : (
                    "Publish"
                  )}
                </Button>
              </Form>
              {error && <p className="error">{errorMessage}</p>}
            </Card.Body>
          </Card>
        </Container>
      </div>
      <Notify notify={notify} title="Updated Successfully!" />
      <Footer />
    </>
  );
}
