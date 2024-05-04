import React from "react";
import AdminNavbar from ".././components/adminNavbar/adminNavbar.js";
import ".././styling/theme.css";
import ".././styling/home.css";

function Home() {
  return (
    <>
      <AdminNavbar />
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
