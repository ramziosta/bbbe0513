import { useState, useContext } from "react";
import Card from "../components/context";
import { UserContext } from "../components/context";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword 
} from "firebase/auth";
import SiteSideBar from "../components/siteSideBar";
import "../styles/SignIn.css";
import Header from "../components/Header";
import Table2 from "../components/Table2";
const provider = new GoogleAuthProvider();

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
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [isDisabled, setIsdisabled] = useState(true);
  const [user, setUser] = useState({});
  const timeStamp = new Date().toLocaleDateString();
  const { setSession } = useContext(UserContext);
  const [warn, setWarn] = useState("");

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

  async function handleLogin() {
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
    const response = await fetch("http://localhost:4000/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        pwd,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.userExists === true) {
      setWarn("Username and Login could not be validated. Please try again");
      setTimeout(() => setWarn(""), 3000);
      return;
    } else {
      setShow(false);
    }
   
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
              status={status}
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
                  <label htmlFor="email">Email address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.currentTarget.value);
                      setIsdisabled(false);
                      if (!e.currentTarget.value) setIsdisabled(true);
                    }}
                  />
                  <br />
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
