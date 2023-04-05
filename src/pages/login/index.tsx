import Head from "next/head";
import Link from "next/link";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { LOGIN_TYPE } from "@/constant";
import Image from "next/image";
import {
  GoogleOutlined,
  GithubOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import { useState, useEffect, useRef, useMemo } from "react";
import { GetServerSideProps } from "next";
import Loading from "@/components/Loading";

const Login = () => {
  const [isShow, setIsShow] = useState(false);
  const [notError, setNotError] = useState(false); //Disable login button
  const [noti, setNoti] = useState(false); //Noti error message
  const [loading, setLoading] = useState(false);
  const [activeImg, setActiveImg] = useState({
    screen1: true,
    screen2: false,
    screen3: false,
  });

  const intervalRef = useRef<number | null | NodeJS.Timer>(null);

  const router = useRouter();

  const initialActiveImg = useMemo(() => {
    return {
      screen1: false,
      screen2: false,
      screen3: false,
    };
  }, []);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Password required !"),
    password: Yup.string()
      .required("No password provided !")
      .min(8, "Password is too short - should be 8 chars minimum !")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters !"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema: LoginSchema,
  });

  useEffect(() => {
    const error: any =
      !formik.errors.password &&
      !formik.errors.email &&
      formik.values.email &&
      formik.values.password;

    setNotError(error);
  }, [formik]);

  async function onSubmit(values: any) {
    try {
      setLoading(true);

      const status = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: "/",
      });

      if (status?.ok) {
        toast("Login successfully...!", {
          onClose: () => router.push(status?.url ? status?.url : ""),
        });
        setLoading(false);
      } else {
        setNoti(true);
        toast("Login failed!, please try again...");
        setLoading(false);
      }
    } catch (err: any) {
      setNoti(true);
      toast(err);
      setLoading(false);
    }
  }

  const handleLogin = (e: any, type: string) => {
    e.preventDefault();
    signIn(type, { callbackUrl: process.env.NEXT_PUBLIC_URL });
  };

  useEffect(() => {
    let flag = 1;
    intervalRef.current = setInterval(() => {
      flag++;
      if (flag === 4) flag = 1;

      if (flag === 1) {
        setActiveImg({
          ...initialActiveImg,
          screen2: true,
        });
      }

      if (flag === 2) {
        setActiveImg({
          ...initialActiveImg,
          screen3: true,
        });
      }
      if (flag === 3) {
        setActiveImg({
          ...initialActiveImg,
          screen1: true,
        });
      }
    }, 2000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="loginpage">
      <div className="login-container">
        <Head>
          <title>Login</title>
        </Head>

        <section className="login-wrapper">
          <div className="login-wrapper--left">
            <Image
              className={classNames("login-image-slide", {
                "login-image-slide--active": activeImg.screen1,
              })}
              width={480}
              height={580}
              src={"/images/screen_shot1.png"}
              alt="instagram cover"
            />
            <Image
              className={classNames("login-image-slide", {
                "login-image-slide--active": activeImg.screen2,
              })}
              width={480}
              height={580}
              src={"/images/screen_shot2.png"}
              alt="instagram cover"
            />
            <Image
              className={classNames("login-image-slide", {
                "login-image-slide--active": activeImg.screen3,
              })}
              width={480}
              height={580}
              src={"/images/screen_shot3.png"}
              alt="instagram cover"
            />
          </div>

          <div className="login-wrapper--right">
            <div className="login-title"></div>
            <form onSubmit={formik.handleSubmit} className="login-form">
              <div className="login-input">
                <label className="login-input--top">
                  <span
                    className={classNames("login-input--top-title", {
                      "login-input--top-title-active": formik.values.email,
                    })}
                  >
                    Phone number, username, or email
                  </span>
                  <input
                    type="email"
                    aria-label="Phone number, username, or email"
                    {...formik.getFieldProps("email")}
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
                    type={isShow ? "text" : "password"}
                    aria-label="Password"
                    {...formik.getFieldProps("password")}
                  />
                  {formik.values.password && (
                    <span
                      onClick={() => setIsShow((prev) => !prev)}
                      className="show-hide"
                    >
                      {isShow ? "Hide" : "Show"}
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
                  {loading ? <Loading /> : "Login"}
                </button>
                <button
                  onClick={(e) => handleLogin(e, LOGIN_TYPE.GOOGLE)}
                  className="login-btn"
                  type="submit"
                >
                  <span>
                    Sign in with Google <GoogleOutlined />
                  </span>
                </button>
                <button
                  onClick={(e) => handleLogin(e, LOGIN_TYPE.GITHUB)}
                  className="login-btn"
                  type="submit"
                >
                  <span>
                    Sign in with Github{" "}
                    <GithubOutlined style={{ marginLeft: "5px" }} />
                  </span>
                </button>
                <button
                  onClick={(e) => handleLogin(e, LOGIN_TYPE.FACEBOOK)}
                  className="login-btn"
                  type="submit"
                >
                  <span>
                    Facebook <FacebookOutlined style={{ marginLeft: "5px" }} />
                  </span>
                </button>
              </div>

              <div className="login-hint">
                {noti && (
                  <div className="noti-eror">
                    There was a problem logging you into Instagram. Please try
                    again soon.
                  </div>
                )}
                <div>
                  <span>Do not have an account yet ?</span>
                  <Link className="login-link" href="/signup">
                    Sign Up
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

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: { session } };
};
