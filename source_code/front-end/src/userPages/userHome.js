import React from "react";
import UserNavbar from "../components/userNavbar.js";
import "../styling/home.css";

function Home() {
  return (
    <>
      <UserNavbar />
      <div className="centered">
        <img
          src={"https://healthkare.s3.amazonaws.com/assets/login-background-2"}
          alt=""
          height={500}
          width={500}
        ></img>
      </div>
    </>
  );
}

export default Home;
