import "./Login.css";

import { ArrowLeft, At, Lock, Login as LoginIcon } from "tabler-icons-react";
import {
  Button as BootstrapButton,
  Card,
  Form,
  Spinner,
} from "react-bootstrap";
import {
  Divider,
  Input,
  InputWrapper,
  Loader,
  Button as MantineButton,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const notifySuccess = () => toast.success("Login Successful!");
  const notifyError = (message) => toast.error(message);

  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    setSubmitting(true);
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setSubmitting(false);
      return;
    }

    axios
      .post(`/api/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setSubmitting(false);

        notifySuccess();

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      })
      .catch((err) => {
        setSubmitting(false);

        notifyError(err.response.data.error);
      });

    setValidated(true);
  };

  return (
    <div className="login-container">
      <div className="card">
        {/* LOGIN TITLE */}
        <h2 className="title is-4 has-text-white">Login</h2>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {/* EMAIL SECTION */}
          <div className="mb-3">
            {/* EMAIL INPUT FIELD */}
            <TextInput
              size="md"
              value={email}
              variant="filled"
              placeholder="Email"
              icon={<At size={14} color="#888" />}
              className="input-field has-text-white"
              onChange={(event) => setEmail(event.currentTarget.value)}
            />

            {/* EMAIL WARNING MESSAGE */}
            <Form.Control.Feedback type="invalid">
              Please provide email
            </Form.Control.Feedback>
          </div>

          {/* PASSWORD SECTION */}
          <div className="mb-3">
            {/* PASSWORD INPUT FIELD */}
            <PasswordInput
              size="md"
              variant="filled"
              value={password}
              placeholder="Password"
              className="input-field"
              icon={<Lock size={14} color="#888" />}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />

            {/* PASSWORD WARNING MESSAGE */}
            <Form.Control.Feedback type="invalid">
              Please enter password
            </Form.Control.Feedback>
          </div>

          {/* LOGIN BUTTON */}
          <div>
            <BootstrapButton
              type="submit"
              className="login-button button is-light has-text-weight-bold is-outlined is-full"
              {...(submitting ? { disabled: true } : {})}
            >
              {submitting ? (
                <Loader size="xs" variant="bars" color={"#FFFFFF"} />
              ) : (
                <>
                  <LoginIcon size={20} className="mr-2" />
                  <span>Login</span>
                </>
              )}
            </BootstrapButton>
          </div>

          {/* FORGOT PASSWORD BUTTON */}
          {/* <MantineButton
            className="mantine-button mt-4 is-clickable"
            variant="subtle"
            radius="xs"
            size="xs"
            compact
            onClick={() => navigate("/")}
          >
            Forgot password?
          </MantineButton> */}

          <Divider mt="lg" mb="md" />

          {/* BACK TO HOME BUTTON */}
          <MantineButton
            className="mantine-button"
            variant="subtle"
            radius="xs"
            size="xs"
            compact
            leftIcon={<ArrowLeft color="white" size={20} />}
            onClick={() => navigate("/")}
          >
            Back to Home
          </MantineButton>
        </Form>
      </div>

      {/* NOTIFICATION - toast */}
      <Toaster />
    </div>
  );
}
