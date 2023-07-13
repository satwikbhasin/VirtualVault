import React from "react";
import ContactCard from "../components/contactCard";
import UserNavbar from "../components/userNavbar";

function Contact() {
  return (
    <>
      <UserNavbar />
      <div className="primary-bg page-header justify-content-center align-content-center d-flex p-2"></div>
      <div className="ternary-bg full-screen-bg">
        <ContactCard />
      </div>
    </>
  );
}

export default Contact;
