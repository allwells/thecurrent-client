import "./Login.css";

import { At, EyeCheck, EyeOff, Lock } from "tabler-icons-react";
import { Button, Card, Container, Form, Spinner } from "react-bootstrap";
import { Input, InputWrapper, PasswordInput } from "@mantine/core";
import React, { useEffect, useState } from "react";

import NavBar from "../NavBar/NavBar";
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
    <>
      <NavBar />

      <Container className="login-container">
        <Card>
          <Card.Body>
            <Card.Title>Login</Card.Title>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              {/* EMAIL FIELD */}
              <Form.Group className="mb-3">
                <InputWrapper id="input-demo" required label="Email">
                  <Input
                    value={email}
                    placeholder="Email"
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
                  required
                  label="Password"
                  icon={<Lock size={20} />}
                  placeholder="Password"
                  value={password}
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
            </Form>
            <div className="error">{error && <p>{errorMsg}</p>}</div>
          </Card.Body>
        </Card>
      </Container>
      <Notify
        notify={notify}
        title="Login Success!"
        children="Welcome back to TheCurrent."
      />
    </>
  );
}
