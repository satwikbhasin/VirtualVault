import React from "react";
import watermark from "../Healthkare-Watermark.png";
import HeadingNavbar from "../components/headingNavbar.js";
import AdminNavbar from "../components/adminNavbar.js";
import "../styling/home.css";

function Home() {
  return (
    <>
      <HeadingNavbar />
      <AdminNavbar />
      <div className="centered">
        <img src={watermark} alt="" height={400} width={400}></img>
      </div>
    </>
  );
}

export default Home;
