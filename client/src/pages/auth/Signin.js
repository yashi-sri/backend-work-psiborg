import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { Button, Form } from "react-bootstrap";
import Header from "../../components/header/header";

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const loginHandler = async (e) => {
    e.preventDefault();
    console.log("login call");
    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const res = await response.json();
      if (res.success) {
        localStorage.setItem("token", res.token);
        navigate("/showbook");
      } else {
        toast.error(res.msg, {
          position: "bottom-right",
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (err) {
      console.log("error in login handler", err);
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />

      <div>
        <div className="signup-parent">
          <Form onSubmit={(e) => loginHandler(e)} className="form">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address *</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password *</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              login
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Signin;
