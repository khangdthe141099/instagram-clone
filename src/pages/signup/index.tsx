import Head from "next/head";
import Link from "next/link";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import classNames from "classnames";
import { useState, useEffect, useRef, useMemo } from "react";
import { GetServerSideProps } from "next";
import Loading from "@/components/Loading";
import { userService } from "@/services/userService";

const Signup = () => {
  const [isShow, setIsShow] = useState({
    password: false,
    cpassword: false,
  });
  const [notError, setNotError] = useState(false); //Disable login button
  const [noti, setNoti] = useState(false); //Noti error message
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Password required !"),
    fullname: Yup.string().required("Fullname required !"),
    username: Yup.string().required("Username required !"),
    password: Yup.string()
      .required("No password provided !")
      .min(8, "Password is too short - should be 8 chars minimum !")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters !"),
    cpassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("No confirmation required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fullname: "",
      username: "",
      cpassword: "",
    },
    onSubmit,
    validationSchema: SignupSchema,
  });

  const notErrorCondition = () => {
    return (
      !formik.errors.password &&
      !formik.errors.email &&
      !formik.errors.username &&
      !formik.errors.fullname &&
      !formik.errors.cpassword &&
      formik.values.email &&
      formik.values.password &&
      formik.values.cpassword &&
      formik.values.username &&
      formik.values.fullname
    );
  };

  useEffect(() => {
    const error: any = notErrorCondition();
    setNotError(error);
  }, [formik]);

  async function onSubmit(values: any) {
    setLoading(true)
    const { cpassword, ...rest } = values;

    userService
      .createUser(rest)
      .then((res) => {
        formik.resetForm();
        toast("Create user successfully...!", {
          onClose: () => router.push("/login"),
        });
        setLoading(false)
      })
      .catch((err) => {
        setNoti(true);
        toast("Error when create new user...!");
        setLoading(false)
      });
  }

  return (
    <div className="loginpage">
      <div className="login-container">
        <Head>
          <title>Signup</title>
        </Head>

        <section className="login-wrapper">
          <div className="login-wrapper--right signup-wrapper">
            <div className="login-title"></div>
            <div className="signup-title">
              Sign up to see photos and videos from your friends.
            </div>
            <form onSubmit={formik.handleSubmit} className="login-form">
              <div className="login-input">
                <label className="login-input--top">
                  <span
                    className={classNames("login-input--top-title", {
                      "login-input--top-title-active": formik.values.email,
                      "fix-email-title": formik.values.email,
                    })}
                  >
                    Mobile Number or Email
                  </span>
                  <input
                    type="email"
                    aria-label="Mobile Number or Email"
                    {...formik.getFieldProps("email")}
                  />
                </label>
              </div>

              <div className="login-input">
                <label className="login-input--top">
                  <span
                    className={classNames("login-input--top-title", {
                      "login-input--top-title-active": formik.values.fullname,
                      "fix-password-title": formik.values.fullname,
                    })}
                  >
                    Full Name
                  </span>
                  <input
                    type="text"
                    aria-label="Full Name"
                    {...formik.getFieldProps("fullname")}
                  />
                </label>
              </div>

              <div className="login-input">
                <label className="login-input--top">
                  <span
                    className={classNames("login-input--top-title", {
                      "login-input--top-title-active": formik.values.username,
                      "fix-password-title": formik.values.username,
                    })}
                  >
                    Username
                  </span>
                  <input
                    type="text"
                    aria-label="Username"
                    {...formik.getFieldProps("username")}
                  />
                </label>
              </div>

              <div className="login-input">
                <label className="login-input--top">
                  <span
                    className={classNames("login-input--top-title", {
                      "login-input--top-title-active": formik.values.password,
                      "fix-password-title": formik.values.password,
                    })}
                  >
                    Password
                  </span>
                  <input
                    type={isShow.password ? "text" : "password"}
                    aria-label="Password"
                    {...formik.getFieldProps("password")}
                  />
                  {formik.values.password && (
                    <span
                      onClick={() =>
                        setIsShow((prev) => ({
                          ...prev,
                          password: !prev.password,
                        }))
                      }
                      className="show-hide"
                    >
                      {isShow.password ? "Hide" : "Show"}
                    </span>
                  )}
                </label>
              </div>

              <div className="login-input">
                <label className="login-input--top">
                  <span
                    className={classNames("login-input--top-title", {
                      "login-input--top-title-active": formik.values.cpassword,
                      "fix-cpassword-title": formik.values.cpassword,
                    })}
                  >
                    Password Confirmation
                  </span>
                  <input
                    type={isShow.cpassword ? "text" : "password"}
                    aria-label="Password Confirmation"
                    {...formik.getFieldProps("cpassword")}
                  />
                  {formik.values.cpassword && (
                    <span
                      onClick={() =>
                        setIsShow((prev) => ({
                          ...prev,
                          cpassword: !prev.cpassword,
                        }))
                      }
                      className="show-hide"
                    >
                      {isShow.cpassword ? "Hide" : "Show"}
                    </span>
                  )}
                </label>
              </div>

              <div className="btn-group">
                <button
                  className={classNames("login-btn", {
                    "login-btn--disabled": !notError,
                  })}
                  type="submit"
                >
                  {loading ? <Loading /> : "Sign up"}
                </button>
              </div>

              <div className="login-hint">
                {noti && (
                  <div className="noti-eror">
                    There was a problem create new account. Please try
                    again soon.
                  </div>
                )}
                <div>
                  <span>Have an account ?</span>
                  <Link className="login-link" href="/login">
                    Log in 
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </section>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
