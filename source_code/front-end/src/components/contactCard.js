import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { getContact } from "../services/contactAPIs";
import "../styling/contactCard.css";
import "../styling/general.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ContactCard = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    whatsapp: "",
    phone: "",
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const contactDetails = await getContact();
        setContact(contactDetails.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchContact();
  }, []);

  return (
    <Container className="contact-card ternary-bg">
      <Row className="p-4">
        <h1 class="contact-name">{contact.name}</h1>
        <hr className="mb-5" />
        <Col className="card-enlarged">
          <a
            href={"tel:" + contact.phone}
            rel="noopener noreferrer"
            target="_blank"
            className="contact-small-font no-underline"
          >
            <i class="bi bi-phone fs-4"></i>
            <h5 className="fw-bold contact-medium-font mt-1">Phone</h5>
            <p className="contact-small-font">{contact.phone}</p>
          </a>
        </Col>
        <Col className="card-enlarged">
          <a
            href={"https://wa.me/" + contact.whatsapp}
            rel="noopener noreferrer"
            target="_blank"
            className="contact-small-font no-underline"
          >
            <i class="bi bi-whatsapp fs-4"></i>
            <h5 className="fw-bold contact-medium-font mt-1">Whatsapp</h5>
            <p className="contact-small-font">{contact.whatsapp}</p>
          </a>
        </Col>
        <Col className="card-enlarged">
          <a
            href={"mailto:" + contact.email}
            rel="noopener noreferrer"
            target="_blank"
            className="contact-small-font no-underline"
          >
            <i class="bi bi-envelope-at fs-4"></i>{" "}
            <h5 className="fw-bold contact-medium-font mt-1">E-Mail</h5>
            <p className="contact-small-font">{contact.email}</p>
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactCard;
