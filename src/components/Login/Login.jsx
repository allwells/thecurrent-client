import "./Login.css";

import { ArrowLeft, At, EyeCheck, EyeOff, Lock } from "tabler-icons-react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import {
  Divider,
  Input,
  InputWrapper,
  Button as MantineButton,
  PasswordInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";

import Notify from "../Notification/Notify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [notify, setNotify] = useState(false);

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
        setNotify(true);

        setTimeout(() => {
          setNotify(false);
          navigate("/profile");
        }, 1500);
      })
      .catch((err) => {
        setSubmitting(false);
        setError(true);
        setErrorMsg(err.response.data.error);
        setTimeout(() => {
          setError(false);
          setErrorMsg("");
        }, 2000);
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
            <div className="d-flex justify-content-center">
              <Button
                type="submit"
                variant="primary"
                className="login-button"
                {...(submitting ? { disabled: true } : {})}
              >
                {submitting ? (
                  <Spinner as="span" animation="border" role="status" />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
            <Divider mt="lg" mb="xs" />
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
          <div className="error">{error && <p>{errorMsg}</p>}</div>
        </Card.Body>
      </Card>
      <Notify
        notify={notify}
        title="Login Success!"
        children="Welcome back to TheCurrent."
      />
    </div>
  );
}
