import React from "react";
import ContactCard from "../components/contactCard";
import UserNavbar from "../components/userNavbar";

function Contact() {
  return (
    <>
      <div className="ternary-bg">
        <UserNavbar />
        <ContactCard />
      </div>
    </>
  );
}

export default Contact;
