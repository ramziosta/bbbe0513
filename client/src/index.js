import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./components/context.js";
import { AuthProvider } from "./context/AuthProvider";
import App from "./App";
import "../src/styles/index.css";
import "../src/styles/index.scss";
import "bootstrap/dist/js/bootstrap.min.js";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserContext.Provider
          value={{ users: [{}], transactions: [], sessionActivity: [] }}>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </UserContext.Provider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
