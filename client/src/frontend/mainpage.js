import { useState, useContext } from "react";
import Card from "../components/context";
import { UserContext } from "../components/context";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import SiteSideBar from "../components/siteSideBar";
import "../styles/SignIn.css";
import Header from "../components/Header";
import Table2 from "../components/Table2";

export default function MainPage() {
  const [show, setShow] = useState(true);

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [isDisabled, setIsdisabled] = useState(true);
  const [user, setUser] = useState({});


  async function handleLogin(e) {
    setShow(true);
  }

  function clearForm() {
    setEmail("");
    setPwd("");
    setIsdisabled(true);
    setShow(true);
  }

  return (
    <>
      <div className="loggedin">
        <SiteSideBar />
        <Card
          className="dashboard-card"
          style={{ maxWidth: "60%", marginTop: "4rem", marginLeft: "10rem" }}
          bgcolor="dark"
          // status={status}
          body={
            <>
              <div className="">
       
                <br />
                <Row className="text-center">
                  <Col>
                    <Link
                      to="/deposit"
                      className="btn btn-primary text-white Link"
                    >
                      Make a deposit
                    </Link>
                  </Col>
                  <Col>
                    <Link
                      to="/withdraw"
                      className="btn btn-primary text-white Link"
                    >
                      Make a withdraw
                    </Link>
                  </Col>

                  <div
                    style={{
                      backgroundColor: "lightgrey",
                      marginTop: "2rem",
                      padding: "2rem",
                    }}
                  >
                    <table className="table table-striped w-auto">
                      <Header />
                      <Table2 />
                    </table>
                  </div>
                </Row>
              </div>
            </>
          }
        />
      </div>
    </>
  );
}
////////////////////////////////////////////////////////////////////////////////

import { useRef, useState, useEffect, useContext } from "react";
import axios from '../api/axios';
import Card from "../components/context";
import AuthContext from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import SiteSideBar from "../components/siteSideBar";
import "../styles/SignIn.css";
import Header from "../components/Header";
import Table2 from "../components/Table2";

import { getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword 
} from "firebase/auth";
const provider = new GoogleAuthProvider();
const LOGIN_URL = '/auth';

export const LoginUser = ({ user }) => {
  return (
    <>
      <h3>
        Welcome <span className="text-danger">{user.user}</span>
      </h3>
    </>
  );
};
function Login() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState('');
  const [isDisabled, setIsdisabled] = useState(true);
  const [warn, setWarn] = useState("");
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState('')
  const [show, setShow] = useState(true);

  useEffect(() => {
    userRef.current.focus();
}, [])

useEffect(() => {
    setErrMsg('');
}, [email, pwd])
 
  function validate(field, label) {
    if (!field) {
      setWarn(label.toUpperCase() + " IS A REQUIRED FIELD");
      setTimeout(() => setWarn(""), 3000);
      return false;
    }
    return true;
  }
  const auth = getAuth();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;

        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("profilePic", profilePic);
        setShow(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function handleLogin(e) {
    e.preventDefault();
    if (!validate(email, "email")) return;
    if (!validate(pwd, "password")) return;
    // firebase log in
    signInWithEmailAndPassword(auth, email, pwd)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
    // auth route from mongo db setup JWT tokens and refresh cookies

    // const response = await fetch("http://localhost:4000/auth", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     email,
    //     pwd,
    //   }),
    // });
    // const data = await response.json();
    // console.log(data);
    // if (data.userExists === true) {
    //   setWarn("Username and Login could not be validated. Please try again");
    //   setTimeout(() => setWarn(""), 3000);
    //   return;
    // } else {
    //   setShow(false);
    // }

    try {
      const response = await axios.post(LOGIN_URL,
          JSON.stringify({ email, pwd }),
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ email, pwd, roles, accessToken });
      setUser('');
      setPwd('');
      setSuccess(true);
      
  } catch (err) {
      if (!err?.response) {
          setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
          setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized');
      } else {
          setErrMsg('Login Failed');
      }
      errRef.current.focus();
  }
  setShow(false);
}

  function clearForm() {
    setEmail("");
    setPwd("");
    setIsdisabled(true);
    setShow(true);
  }

  return (
    <>
      {show ? (
        <>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <div style={{ background: "grey", height: "62vh" }}>
            <Card
              style={{
                maxWidth: "25rem",
                marginTop: "1rem",
                backgroundColor: "rgba(30,33,36)",
                width: "100%",
                minHeight: "400px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                padding: "1rem",
              }}
              className="loginCard bg-dark"
              body={
                <>
                  <h1
                    className="logocolor"
                    style={{
                      border: "solid 2px grey",
                      padding: ".4rem",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Login
                  </h1>
                  <br />

                  {/* //!############ Email ############## */}
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    ref={userRef}
                    autoComplete="off"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.currentTarget.value);
                      setIsdisabled(false);
                      if (!e.currentTarget.value) setIsdisabled(true);
                    }}
                  />
                  <br />
                  {/* //!############ Password ############## */}
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={pwd}
                    onChange={(e) => {
                      setPwd(e.currentTarget.value);
                      setIsdisabled(false);
                      if (!e.currentTarget.value) setIsdisabled(true);
                    }}
                  />
                  <br />
                  <button
                    disabled={isDisabled ? true : false}
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                  <br />
                  <button
                    class="login-with-google-btn"
                    onClick={signInWithGoogle}
                  >
                    Sign in with Google
                  </button>
                  <br />
                  <h5 style={{ marginTop: "1rem" }}>Dont  have an account?</h5>
                  <Link
                    to="/logout"
                    className="btn btn-primary fs-2 Link "
                    style={{ borderRadius: "0px", marginTop: "1rem" }}
                  >
                    Create an Account
                  </Link>
                </>
              }
            />
          </div>
        </>
      ) : (
        <>
          <SiteSideBar />
          <Card
            className="dashboard-card"
            style={{ maxWidth: "60%", marginTop: "4rem", marginLeft: "10rem" }}
            bgcolor="dark"
            // status={status}
            body={
              <>
                <div className="">
                  <LoginUser user={user} />
                  <br />
                  <Row className="text-center">
                    <Col>
                      <Link
                        to="/deposit"
                        className="btn btn-primary text-white Link"
                      >
                        Make a deposit
                      </Link>
                    </Col>
                    <Col>
                      <Link
                        to="/withdraw"
                        className="btn btn-primary text-white Link"
                      >
                        Make a withdraw
                      </Link>
                    </Col>

                    <div
                      style={{
                        backgroundColor: "lightgrey",
                        marginTop: "2rem",
                        padding: "2rem",
                      }}
                    >
                      <table className="table table-striped w-auto">
                        <Header />
                        <Table2 />
                      </table>
                    </div>
                  </Row>
                </div>
              </>
            }
          />
          {/* !------------- */}
        </>
      )}
    </>
  );
}

export default Login;