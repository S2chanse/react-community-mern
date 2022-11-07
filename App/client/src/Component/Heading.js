import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import firebase from "../FireBase";

export default function Heading() {
  const styleObj = {
    color: "white",
    textDecoration: "none",
    marginRight: "10px",
    cursor: "pointer",
  };
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const LogoutHandler = () => {
    firebase.auth().signOut();
    navigate("/login");
  };
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">React-Community</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" style={styleObj}>
              Home
            </Link>
            <Link to="/upload" style={styleObj}>
              Upload
            </Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {user.accessToken === "" ? (
            <Link to="/login" style={styleObj}>
              Login
            </Link>
          ) : (
            <>
              <Navbar.Text
                style={{
                  color: "#ffffff",
                  cursor: "pointer",
                }}
                onClick={() => LogoutHandler()}
              >
                Logout
              </Navbar.Text>
              <Navbar.Text
                style={{
                  color: "#ffffff",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
                onClick={() => LogoutHandler()}
              ></Navbar.Text>
              <br />
              <Navbar.Text>
                <Link to={`/myPage/${user.uid}`} style={styleObj}>
                  My Page
                </Link>
              </Navbar.Text>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
