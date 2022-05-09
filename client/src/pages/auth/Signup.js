import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

import "./signup.css";
import Header from "../../components/header/header";
function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const registerHandler = async (e) => {
    console.log("handler call");
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, password, confirmPassword }),
      });
      const res = await response.json();
      if (res.success) {
        navigate("/login");
      } else {
        toast.error(res.msg, {
          position: "bottom-right",
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (err) {
      console.log("error in register handler", err);
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />

      <div className="signup-parent">
        <Form onSubmit={(e) => registerHandler(e)} className="form">
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>User Name *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Full Name"
              value={fullName || ""}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
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
          <Form.Group className="mb-3" controlId="formBasicPassword1">
            <Form.Label>Password *</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword2">
            <Form.Label> confirm Password *</Form.Label>
            <Form.Control
              type="text"
              placeholder=" confirm Password"
              value={confirmPassword || ""}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Signup;
