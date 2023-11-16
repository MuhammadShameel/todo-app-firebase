import React, { useState, useEffect } from "react";
import Todo from "../Todo";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

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
      <div className="d-flex w-100 justify-content-around align-items-center mx-auto mt-5">
        {userName ? (
          <>
            <h2>Welcome {userName}</h2>
            <button onClick={handleLogOut} className="btn btn-primary">
              Logout
            </button>
          </>
        ) : (
          <div className="d-flex w-75 justify-content-around align-items-center mx-auto mt-5">
            <Link to="/signin" className="btn btn-primary h-25 w-auto ms-1">
              SignIn
            </Link>
          </div>
        )}
      </div>
      {user && <Todo />}
    </div>
  );
}

export default Home;
