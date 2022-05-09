import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import AddBook from "./pages/AddBook";
import ShowBook from "./pages/ShowBook";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" exact element={<Signup />} />
        <Route path="/login" exact element={<Signin />} />
        <Route path="/addbook" exact element={<AddBook />} />
        <Route path="/Showbook" exact element={<ShowBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
