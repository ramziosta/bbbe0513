import Card from "../context/context";
import SiteSideBar from "../components/siteSideBar";
import { NavLink, Link } from "react-router-dom";
import LoginLogoutButton from "../components/LoginLogoutButton";
import Header from "../components/Header";
import Table2 from "../components/Table2";
import "../styles/alldata.css";

function DashBoard() {
  return (
    <>
      <SiteSideBar />
      <div className="content">
        <Card
          body={
            <div>
              <Header />
              <Table2 />
            </div>
          }
        />
      </div>
    </>
  );
}

export default DashBoard;
