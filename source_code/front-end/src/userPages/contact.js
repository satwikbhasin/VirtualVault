import React from "react";
import ContactCard from "../components/contactCard";
import UserNavbar from "../components/userNavbar";

function Contact() {
  return (
    <>
      <UserNavbar />
      <div className="primary-bg full-screen-bg">
        <ContactCard />
      </div>
    </>
  );
}

export default Contact;
