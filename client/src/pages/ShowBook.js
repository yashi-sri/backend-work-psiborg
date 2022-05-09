import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { Table } from "react-bootstrap";
import Header from "../components/header/header";

import "./book.css";

const ShowBook = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState(null);

  const showItem = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/user/showBook", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(),
      });

      const res = await response.json();

      console.log(res);
      if (res.success) setBooks(res.data);
    } catch (err) {
      console.log("error in showbook handler", err);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/user/deleteBook",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({ id }),
        }
      );

      const res = await response.json();
      if (res.success) {
        showItem();
        toast.success(res.msg, {
          position: "bottom-right",
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (err) {
      console.log("error in delete handler", err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) showItem();
    else navigate("/login");
  }, []);

  return (
    <>
      <Header />
      <ToastContainer />

      <div className="show-book">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>BOOk NAME</th>
              <th>PRICE </th>
              <th> AUTHOR NAME</th>
              <th> REMOVE</th>
            </tr>
          </thead>

          <tbody>
            {books &&
              books.map((item, index) => (
                <>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.bookDetail.bookName}</td>
                    <td>{item.bookDetail.price}</td>
                    <td>{item.authorDetail.AuthorName}</td>
                    <td>
                      <button onClick={() => deleteHandler(item.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ShowBook;
