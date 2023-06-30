import React from "react";
import watermark from "../Healthkare-Watermark.png";
import UserNavbar from "../components/userNavbar.js";
import "../styling/home.css";

function Home() {
  return (
    <>
      <UserNavbar />
      <div className="centered">
        <img src={watermark} alt="" height={400} width={400}></img>
      </div>
    </>
  );
}

export default Home;
