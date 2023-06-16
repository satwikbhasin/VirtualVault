import React from "react";
import ContactCard from "../components/contactCard";
import HeadingNavbar from "../components/headingNavbar";
import UserNavbar from "../components/userNavbar";

function Contact() {
  return (
    <>
      <HeadingNavbar />
      <UserNavbar />
      <ContactCard />
    </>
  );
}

export default Contact;
