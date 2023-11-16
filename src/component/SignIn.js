/* eslint-disable no-undef */
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase.utils";
import "../App.css";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorPromt, setError] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleLogin = async () => {
    if (!values.email || !values.password || submitDisabled) {
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      console.log(user);

      setSuccessMessage("User is successfully entered");
      window.location.href = "/";
    } catch (err) {
      setSubmitDisabled(false);

      if (err.code === "auth/wrong-password") {
        setError("Wrong password. Please try again.");
      } else if (err.code === "auth/user-not-found") {
        setError("User not found. Please sign up first.");
      } else {
        setError(err.message);
      }
    }
  };

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      setSuccessMessage("User is successfully signed in with Facebook");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const seePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="container mx-auto">
        <div className="w-50 mx-auto border p-3 mt-5 shadow p-3 mb-5 bg-white rounded login-container">
          <h2 className="text-center title">SignIn</h2>
          <form className="w-100 mx-auto ">
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                onChange={(event) =>
                  setValues({ ...values, email: event.target.value })
                }
                className="form-control"
                id="inputEmail"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <div className="input-group">
                <input
                  className="form-control"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={(event) =>
                    setValues({ ...values, password: event.target.value })
                  }
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary border-none"
                  onClick={seePassword}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-eye-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-eye-slash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                      <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="mb-2 text-center">
              <b>{errorPromt}</b>
              <b>{successMessage}</b>
            </div>
            <div className="d-flex justify-content-end">
              <button className="btn bg-primary text-white ">
                Forgot Password
              </button>
            </div>
            <div className="d-flex justify-content-center align-items-center flex-wrap">
              <button
                type="submit"
                onClick={handleLogin}
                disabled={submitDisabled}
                className="btn btn-primary w-25 login-btn"
              >
                {" "}
                SignIn
              </button>
              <p className="mt-3 ms-3">
                Not a member? <a href="/signup">SignUp</a>
              </p>
            </div>

            <button
              type="button"
              id="facebook-login"
              name="facebook-login"
              className="btn btn-primary btn-lg btn-block"
              onClick={handleFacebookLogin}
            >
              <i class="fa fa-facebook "></i> Login with Facebook
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
