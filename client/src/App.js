import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import AddBook from "./pages/AddBook";
import ShowBook from "./pages/ShowBook";
import "./App.css";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      navigate("/showbook");
    }
  }, []);

  return (
    <Routes>
      <Route path="/register" exact element={<Signup />} />
      <Route path="/login" exact element={<Signin />} />
      <Route path="/addbook" exact element={<AddBook />} />
      <Route path="/Showbook" exact element={<ShowBook />} />
    </Routes>
  );
};

export default App;
