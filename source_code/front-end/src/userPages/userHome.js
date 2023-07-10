import React from "react";
import UserNavbar from "../components/userNavbar.js";
import "../styling/home.css";
import "../styling/theme.css";

function Home() {
  return (
    <>
      <UserNavbar />
      <div className="home-screen-watermark ternary-bg">
        <img
          src={"https://healthkare.s3.amazonaws.com/assets/login-background-3"}
          alt=""
          height={500}
          width={500}
        ></img>
      </div>
    </>
  );
}

export default Home;
