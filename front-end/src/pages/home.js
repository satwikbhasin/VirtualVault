import React from "react";
import watermark from "../Healthkare-Watermark.png";
import "../styling/home.css";

function Home() {
  return (
    <div class="centered">
      <img src={watermark} alt="" height={400} width={400}></img>
    </div>
  );
}

export default Home;
