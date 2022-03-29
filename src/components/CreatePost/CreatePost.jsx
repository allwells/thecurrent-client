import "./CreatePost.css";

import { Button, Card, Container, Form, Spinner } from "react-bootstrap";
import { Input, InputWrapper } from "@mantine/core";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@aaditya1978/ckeditor5-build-classic";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import SelectForm from "../SelectForm/SelectForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const navigate = useNavigate();

  const notifySuccess = () => toast.success("Published Successfully!");
  const notifyError = (message) => toast.error(message);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [imageName, setImageName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const sanitizeContent = content.trim();

    if (sanitizeContent.length < 200) {
      notifyError("Content must be at least 200 characters long");
      setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", sanitizeContent);
    formData.append("author", author);
    formData.append("category", category);
    formData.append("image", imageData);
    formData.append("date", new Date());
    formData.append("token", localStorage.getItem("token"));

    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/create`,
      data: formData,
    })
      .then((res) => {
        setSubmitting(false);

        notifySuccess();

        setInterval(() => {
          navigate("/");
        }, 2100);
      })
      .catch((err) => {
        setSubmitting(false);
        notifyError(err.response.data.error);
        navigate("/login");
      });
  };

  return (
    <>
      <NavBar />
      <div className="createpost-container">
        <Container>
          <Card>
            <Card.Body>
              <h1 className="heading">Create Post</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <SelectForm category={category} setCategory={setCategory} />
                  <InputWrapper
                    style={{ marginBottom: "1rem" }}
                    id="input-demo"
                    label="Author"
                  >
                    <Input
                      id="input-demo"
                      placeholder="Author name"
                      value={author}
                      onChange={(event) => setAuthor(event.currentTarget.value)}
                    />
                  </InputWrapper>
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
            </Card.Body>
          </Card>
        </Container>
      </div>

      <Toaster />
      <Footer />
    </>
  );
}
