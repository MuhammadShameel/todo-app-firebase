import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase.utils";

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorPromt, setErrorPromt] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(false);

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
  return (
    <div>
      <div className="container mx-auto">
        <div className="w-50 mx-auto border p-3 mt-5 shadow p-3 mb-5 bg-white rounded ">
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
                className="btn btn-primary w-25 login-btn"
                disabled={submitDisabled}
              >
                {" "}
                Signup
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
