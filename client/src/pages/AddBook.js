import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { Button, Form } from "react-bootstrap";
import Header from "../components/header/header";
import "./book.css";

const AddBook = () => {
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [publishDate, setPublishDate] = useState(null);
  const [price, setPrice] = useState(null);

  const [author, setAuthor] = useState(null);
  const [age, setAge] = useState(null);
  const [dob, setDob] = useState(null);

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/user/addBook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ book, publishDate, price, author, age, dob }),
      });
      const res = await response.json();
      // console.log(res);
      if (res.success) {
        toast.success("Book Add", {
          position: "bottom-right",
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (err) {
      console.log("error in addbook handler", err);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, []);

  return (
    <>
      <Header />
      <ToastContainer />
      <div>
        <Form className="form-add-book" onSubmit={(e) => addItem(e)}>
          <h3>Book Detail</h3>
          <div className="form-detail">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Book Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Book Name"
                value={book || ""}
                onChange={(e) => setBook(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Publish Date *</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter publish date"
                value={publishDate || ""}
                onChange={(e) => setPublishDate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>price *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Price"
                value={price || ""}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>
          </div>
          <h3>Author Detail</h3>
          <div className="form-detail">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Author Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Author Name"
                value={author || ""}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label> AGE *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Age"
                value={age || ""}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>DATE OF BIRTH *</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter date of birth"
                value={dob || ""}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </Form.Group>
          </div>
          <Button className="mb-3" variant="primary" type="submit">
            Add Now
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddBook;
