import React from "react";
import UserNavbar from "../components/userNavbar.js";
import "../styling/home.css";
import "../styling/theme.css";

function Home() {
  return (
    <>
      <UserNavbar />
      <div className="home-screen-watermark primary-bg full-screen-bg">
        <img
          src={"https://i.ibb.co/2M9CYGq/Hospital-bed-cuate.png"}
          alt=""
          height={500}
          width={500}
        ></img>
      </div>
    </>
  );
}

export default Home;
