import Card from "../context/context";
import SiteSideBar from "../components/siteSideBar";
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
              <Table2 />
            </div>
          }
        />
      </div>
    </>
  );
}

export default DashBoard;
