import React, { useState, useEffect } from "react";
import Todo from "../Todo";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import "./Home.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Home() {
  const [userName, setUserName] = useState(null);
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName);
        setUser(user);
      } else {
        setUserName(null);
        setUser(null);
      }
    });
  }, [auth]);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("SignOut successfully.");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className=" w-100 justify-content-around align-items-center mx-auto mt-1">
        {userName ? (
          <>
            <Navbar
              expand="lg"
              className="bg-body-tertiary secondary-background-color"
            >
              <Container fluid className="w-100">
                <Navbar.Brand href="#" className="text-white accordion ms-auto">
                  <h5 className="text-white">Welcome {userName}</h5>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: "100px" }}
                    navbarScroll
                  ></Nav>
                  <Form className="d-flex">
                    <button
                      onClick={handleLogOut}
                      className="btn orange_color_bg text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-box-arrow-left w-100 h-h-100 "
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                        />
                      </svg>
                    </button>
                  </Form>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </>
        ) : (
          <div className="w-100">
            <Navbar
              expand="lg"
              className="bg-body-tertiary secondary-background-color"
            >
              <Container fluid className="w-100">
                <Navbar.Brand
                  href="#"
                  className="text-white accordion  me-auto "
                >
                  TODO APP
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: "100px" }}
                    navbarScroll
                  ></Nav>
                  <Form className="d-flex">
                    <Link
                      to="/signin"
                      className="btn orange_color_bg text-white h-25 w-auto "
                    >
                      SignIn
                    </Link>
                  </Form>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <div>
              {" "}
              <h1 className="orange_color mt-5 text-center">
                Create Your Profile To Enjoy TODO APP
              </h1>
            </div>
          </div>
        )}
      </div>

      {user && <Todo />}
    </div>
  );
}

export default Home;
