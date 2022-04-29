import "./Login.css";

import {
  ArrowLeft,
  At,
  EyeCheck,
  EyeOff,
  Lock,
  Login as LoginIcon,
} from "tabler-icons-react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import {
  Divider,
  Input,
  InputWrapper,
  Button as MantineButton,
  PasswordInput,
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
      <Card>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {/* EMAIL FIELD */}
            <Form.Group className="mb-3">
              <InputWrapper className="input-field" label="Email">
                <Input
                  value={email}
                  variant="filled"
                  placeholder="Email"
                  className="input-field"
                  icon={<At size={20} />}
                  onChange={(event) => setEmail(event.currentTarget.value)}
                />
              </InputWrapper>

              {/* EMAIL WARNING MESSAGE */}
              <Form.Control.Feedback type="invalid">
                Please provide email
              </Form.Control.Feedback>
            </Form.Group>

            {/* PASSWORD FIELD */}
            <Form.Group className="mb-3">
              <PasswordInput
                variant="filled"
                value={password}
                label="Password"
                placeholder="Password"
                className="input-field"
                icon={<Lock size={20} />}
                onChange={(event) => setPassword(event.currentTarget.value)}
                visibilityToggleIcon={({ reveal, size }) =>
                  reveal ? <EyeOff size={size} /> : <EyeCheck size={size} />
                }
              />

              {/* PASSWORD WARNING MESSAGE */}
              <Form.Control.Feedback type="invalid">
                Please enter password
              </Form.Control.Feedback>
            </Form.Group>

            {/* LOGIN BUTTON */}
            <div className="is-full">
              <Button
                type="submit"
                className="login-button button is-full is-link has-text-bold"
                {...(submitting ? { disabled: true } : {})}
              >
                {submitting ? (
                  <Spinner as="span" animation="border" role="status" />
                ) : (
                  <>
                    <LoginIcon size={20} className="mr-2" />
                    <span>Login</span>
                  </>
                )}
              </Button>
            </div>
            {/* <MantineButton
              className="mantine-button mt-2 is-clickable"
              variant="subtle"
              radius="xs"
              size="xs"
              compact
              onClick={() => navigate("/")}
            >
              Forgot password?
            </MantineButton> */}
            <Divider mt="lg" mb="md" />
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
          <Toaster />
        </Card.Body>
      </Card>
    </div>
  );
}
