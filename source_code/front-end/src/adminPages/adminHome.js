import React from "react";
import watermark from "../Healthkare-Watermark.png";
import AdminNavbar from "../components/adminNavbar.js";
import "../styling/home.css";

function Home() {
  return (
    <>
      <AdminNavbar />
      <div className="centered">
        <img src={watermark} alt="" height={400} width={400}></img>
      </div>
    </>
  );
}

export default Home;
