import NavBar from "./components/navbar.js";
import react, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AllData from "./frontend/alldata.js";
import CreateAccount from "./frontend/createaccount.js";
import Deposit from "./frontend/deposit.js";
import Home from "./frontend/home.js";
import Withdraw from "./frontend/withdraw.js";
import Login from "./frontend/login.js";
import Logout from "./frontend/logout";
import Footer from "./components/footer";
import DashBoard from "./frontend/DashBoard";
import Cookies from "js-cookie";
import "./styles/Home.css";


let loggedInUser = Cookies.get("loggedInUser");

function App() {
  const [loginData, setLoginData] = useState(
    Cookies.get("loginData") ? JSON.parse(Cookies.get("loginData")) : null
  );
  let user;
  //! change name to user..
  !loginData ? (user = Cookies.get("name")) : (user = loginData.user);
  return (
    <>
      <BrowserRouter>
        <NavBar loggedInUser={loggedInUser} />
        <div className="container" style={{ padding: "10px" }}></div>
        {loggedInUser || loginData ? (
          <div
            style={{
              position: "relative",
              color: "red",
              fontSize: "1.2rem",
              textAlign: "right",
              padding: "15px",
            }}
          >
            {`Welcome, ${user || ""} `}
          </div>
        ) : (
          ""
        )}

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/CreateAccount/" element={<CreateAccount />} />
          <Route path="/dashboard/" exact element={<DashBoard />} />
          <Route path="/deposit/" exact element={<Deposit />} />
          <Route path="/withdraw/" exact element={<Withdraw />} />
          <Route path="/alldata/" exact element={<AllData />} />
          <Route path="/login/" exact element={<Login />} />
          <Route path="/logout/" exact element={<Logout />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
