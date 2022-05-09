import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    navigate("/login");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) setIsAuth(true);
  }, []);
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              {!isAuth && (
                <>
                  <Nav.Link>
                    <Link to="/login" className="link-class">
                      Login
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/register" className="link-class">
                      Register
                    </Link>
                  </Nav.Link>
                </>
              )}
              {isAuth && (
                <>
                  <Nav.Link>
                    <Link to="/addbook" className="link-class">
                      Add Book
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/showbook" className="link-class">
                      Show Book
                    </Link>
                  </Nav.Link>
                  <Nav.Link onClick={() => logout()}>logout</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
