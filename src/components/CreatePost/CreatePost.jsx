import "./CreatePost.css";

import {
  Input,
  InputWrapper,
  Loader,
  Button as MantineButton,
  TextInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { Button as BootstrapButton } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@aaditya1978/ckeditor5-build-classic";
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
      <div className="createpost-container">
        <div className="container">
          <div className="card">
            {/* CREATE POST HEADING */}
            <h1 className="title is-4 has-text-dark">Create Post</h1>

            <form onSubmit={handleSubmit}>
              {/* CATEGORY SELECTION FORM */}
              <SelectForm category={category} setCategory={setCategory} />

              {/* NAME OF AUTHOR */}
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

              {/* COVER PICTURE LABEL */}
              <label className="subtitle is-5 has-text-dark has-text-weight-normal">
                Add Cover Image
              </label>

              {/* COVER PICTURE FIELD */}
              <Input
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

              {/* COVER PICTURE PREVIEW */}
              {image && (
                <img className="img-preview" src={image} alt="preview" />
              )}

              <br />

              {/* COVER PICTURE UPLOAD BUTTON */}
              {image && (
                <MantineButton
                  className="remove-image is-full button is-danger has-text-white is-clickable"
                  onClick={() => {
                    setImage(null);
                    setImageData(null);
                    setImageName("");
                  }}
                >
                  Remove
                </MantineButton>
              )}

              {/* POST TITLE */}
              <div className="my-3">
                <TextInput
                  type="text"
                  className="postTitle"
                  placeholder="Post Title Here"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  required
                />
              </div>

              {/* RICH TEXT EDITOR */}
              <CKEditor
                editor={ClassicEditor}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setContent(data);
                }}
                config={{
                  placeholder: "Write your post content here...",
                }}
              />

              {/* PUBLISH BUTTON */}
              <BootstrapButton
                type="submit"
                className=" button is-full is-link has-text-bold mt-3 submit"
                {...(submitting ? { disabled: true } : {})}
              >
                {submitting ? <Loader variant="bars" size={"xs"} /> : "Publish"}
              </BootstrapButton>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
