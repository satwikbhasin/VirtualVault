import React from "react";
import AdminNavbar from ".././components/adminNavbar/adminNavbar.js";
import ".././styling/text-styling.css";

function Home() {
  return (
    <>
      <AdminNavbar />
      <div className="centered ternary-bg">
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
