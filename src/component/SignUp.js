import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase.utils";
import {
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import GoogleButton from "react-google-button";

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorPromt, setErrorPromt] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  console.log(successMessage, errorMsg);
  const handleSubmission = async () => {
    if (!values.name || !values.email || !values.password || submitDisabled) {
      return;
    }

    setErrorPromt("");
    setSubmitDisabled(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: values.name,
      });

      window.location.href = "/signin";
    } catch (err) {
      setSubmitDisabled(false);
      if (err.code === "auth/email-already-in-use") {
        setErrorPromt(
          "The email address is already in use. Please use a different email."
        );
      } else {
        setErrorPromt(err.message);
      }
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      setSuccessMessage("Successfully SignIn");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = result.user;
      console.log(user);
      window.location.href = "/";
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div>
      <div className="container mx-auto">
        <div className="register-box mx-auto border p-3 mt-5 shadow p-3 mb-5 bg-white rounded  secondary-background-color border-0 text-white ">
          <h2 className="text-center title">SignUp</h2>
          <form className="w-100 mx-auto ">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                onChange={(event) =>
                  setValues({ ...values, name: event.target.value })
                }
                className="form-control"
                id="exampleInputName"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                onChange={(event) =>
                  setValues({ ...values, email: event.target.value })
                }
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>

              <div className="input-group">
                <input
                  className="form-control"
                  id="exampleInputPassword1"
                  type={showPassword ? "text" : "password"}
                  onChange={(event) =>
                    setValues({ ...values, password: event.target.value })
                  }
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary border-none"
                  onClick={togglePasswordVisibility}
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
            </div>

            <div className="d-flex justify-content-center align-items-center flex-wrap">
              <button
                type="submit"
                onClick={handleSubmission}
                className="btn orange_color_bg text-white text-white w-75 login-btn hover-effect"
                disabled={submitDisabled}
              >
                {" "}
                Continue
              </button>
              <GoogleButton
                className="w-75 mt-2 google-btn hover-effect"
                onClick={handleGoogleLogin}
              />
              <button
                type="button"
                id="facebook-login"
                name="facebook-login"
                className="btn btn-primary w-75 login-btn mt-2 hover-effect"
                onClick={handleFacebookLogin}
              >
                <h6 className="text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="#ffff"
                    className="bi bi-facebook me-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>{" "}
                  SignUp with Facebook
                </h6>
              </button>

              <p className="mt-3 ms-3">
                already registered <a href="./signin">SignIn</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
