import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AllData from "./frontend/alldata.js";
import CreateAccount from "./frontend/createaccount.js";
import DashBoard from "./frontend/DashBoard";
import Deposit from "./frontend/deposit.js";

import Home from "./frontend/Home.js";
import Login from "./frontend/login.js";
import Logout from "./frontend/logout";

import Withdraw from "./frontend/withdraw.js";
import Layout from "./components/Layout";
import Editor from "./components/Editor";
import Admin from "./components/Admin";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import Lounge from "./components/Lounge";
import Directory from "./components/Directroy";
import Register from "./components/Register";
import RequireAuth from "./components/RequireAuth";
import ROLES from "./config/roles_list";
import "./styles/Home.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" exact element={<Home />} />
          <Route path="/CreateAccount/" element={<CreateAccount />} />
          <Route path="/login/" exact element={<Login />} />
          <Route path="directory" element={<Directory />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="/alldata/" exact element={<AllData />} />

          {/* protected routes with role permission */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/dashboard/" exact element={<DashBoard />} />
            <Route path="/deposit/" exact element={<Deposit />} />
            <Route path="/withdraw/" exact element={<Withdraw />} />
            <Route path="/logout/" exact element={<Logout />} />
            {/* <Route path="/userdata/" exact element={<UserData />} /> */}
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route
            element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}
          >
            <Route path="lounge" element={<Lounge />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
