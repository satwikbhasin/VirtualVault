import AdminNavbar from "../components/adminNavbar/adminNavbar.js";
import { Button, Table, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getContact } from "../services/contactAPIs.js";
import ContactCard from "../components/contactCard.js";
import "../styling/contactCard.css";
import "../styling/adminContact.css";
import "../styling/buttons.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { FormGroup, Switch, FormControlLabel } from "@mui/material";
import { updateContact } from "../services/contactAPIs.js";

const Contact = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    whatsapp: "",
    phone: "",
  });
  const [updatedContact, setUpdatedContact] = useState({
    name: "",
    email: "",
    whatsapp: "",
    phone: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editWhatsapp, setEditWhatsapp] = useState(false);
  const [editPhone, setEditPhone] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const contactDetails = await getContact();
        setContact(contactDetails.data[0]);
        setUpdatedContact(contactDetails.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchContact();
  }, []);

  const handleUpdateContact = async () => {
    try {
      if (
        updatedContact.name === contact.name &&
        updatedContact.email === contact.email &&
        updatedContact.whatsapp === contact.whatsapp &&
        updatedContact.phone === contact.phone
      ) {
        alert("No Changes Made");
        return;
      } else {
        setContact(updatedContact);
        await updateContact(updatedContact);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="primary-bg full-screen-bg">
      <AdminNavbar />
      <div className="primary-bg page-header justify-content-center align-content-center d-flex p-2">
        <Form className="edit-switch">
          <FormGroup>
            <FormControlLabel
              control={<Switch />}
              onChange={() => setIsEditMode(!isEditMode)}
              labelPlacement="start"
              label={
                <div>
                  <span className="ms-2">Edit</span>
                </div>
              }
            />
          </FormGroup>
        </Form>
      </div>
      {isEditMode ? (
        <Table className="text-center">
          <thead>
            <tr>
              <th
                style={{
                  width: "200px",
                  background: "#2d383c",
                  color: "white",
                }}
              >
                Component
              </th>
              <th
                style={{
                  width: "400px",
                  background: "#2d383c",
                  color: "white",
                }}
              >
                Value
              </th>
              <th
                style={{
                  width: "200px",
                  background: "#2d383c",
                  color: "white",
                }}
              >
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  background: "#2d383c",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Name
              </td>
              {editName ? (
                <td
                  style={{
                    background: "#2d383c",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  <Form.Control
                    type="text"
                    className="contact-edit-input"
                    placeholder={contact.name}
                    value={updatedContact.name}
                    onChange={(event) =>
                      setUpdatedContact({
                        ...updatedContact,
                        name: event.target.value,
                      })
                    }
                  />
                </td>
              ) : (
                <td
                  style={{
                    background: "#2d383c",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  {contact.name}
                </td>
              )}
              <td
                style={{
                  background: "#2d383c",
                  color: "white",
                  textAlign: "center",
                }}
              >
                {editName ? (
                  <Button
                    variant=""
                    onClick={() => {
                      setEditName(!editName);
                      handleUpdateContact();
                    }}
                  >
                    <span className="contact-save-button">Save</span>
                  </Button>
                ) : (
                  <Button
                    variant=""
                    onClick={() => {
                      setEditName(!editName);
                    }}
                  >
                    <i class="bi bi-pencil fs-6 text-light"></i>
                  </Button>
                )}
              </td>
            </tr>
            <tr>
              <td style={{ background: "#2d383c", color: "white" }}>Email</td>
              {editEmail ? (
                <td style={{ background: "#2d383c", color: "white" }}>
                  <Form.Control
                    type="text"
                    className="contact-edit-input"
                    placeholder={contact.email}
                    value={updatedContact.email}
                    onChange={(event) =>
                      setUpdatedContact({
                        ...updatedContact,
                        email: event.target.value,
                      })
                    }
                  />
                </td>
              ) : (
                <td style={{ background: "#2d383c", color: "white" }}>
                  {contact.email}
                </td>
              )}
              <td style={{ background: "#2d383c", color: "white" }}>
                {editEmail ? (
                  <Button
                    variant=""
                    onClick={() => {
                      setEditEmail(!editEmail);
                      handleUpdateContact();
                    }}
                  >
                    <span className="contact-save-button">Save</span>
                  </Button>
                ) : (
                  <Button
                    variant=""
                    onClick={() => {
                      setEditEmail(!editEmail);
                    }}
                  >
                    <i class="bi bi-pencil fs-6 text-light"></i>
                  </Button>
                )}
              </td>
            </tr>
            <tr>
              <td style={{ background: "#2d383c", color: "white" }}>
                Whatsapp
              </td>
              {editWhatsapp ? (
                <td style={{ background: "#2d383c", color: "white" }}>
                  <Form.Control
                    type="text"
                    className="contact-edit-input"
                    placeholder={contact.whatsapp}
                    value={updatedContact.whatsapp}
                    onChange={(event) =>
                      setUpdatedContact({
                        ...updatedContact,
                        whatsapp: event.target.value,
                      })
                    }
                  />
                </td>
              ) : (
                <td style={{ background: "#2d383c", color: "white" }}>
                  {contact.whatsapp}
                </td>
              )}
              <td style={{ background: "#2d383c", color: "white" }}>
                {editWhatsapp ? (
                  <Button
                    variant=""
                    onClick={() => {
                      setEditWhatsapp(!editWhatsapp);
                      handleUpdateContact();
                    }}
                  >
                    <span className="contact-save-button">Save</span>
                  </Button>
                ) : (
                  <Button
                    variant=""
                    onClick={() => {
                      setEditWhatsapp(!editWhatsapp);
                    }}
                  >
                    <i class="bi bi-pencil fs-6 text-light"></i>
                  </Button>
                )}
              </td>
            </tr>
            <tr>
              <td style={{ background: "#2d383c", color: "white" }}>Phone</td>
              {editPhone ? (
                <td style={{ background: "#2d383c", color: "white" }}>
                  <Form.Control
                    type="text"
                    className="contact-edit-input"
                    placeholder={contact.phone}
                    value={updatedContact.phone}
                    onChange={(event) =>
                      setUpdatedContact({
                        ...updatedContact,
                        phone: event.target.value,
                      })
                    }
                  />
                </td>
              ) : (
                <td style={{ background: "#2d383c", color: "white" }}>
                  {contact.phone}
                </td>
              )}
              <td style={{ background: "#2d383c", color: "white" }}>
                {editPhone ? (
                  <Button
                    variant=""
                    onClick={() => {
                      setEditPhone(!editPhone);
                      handleUpdateContact();
                    }}
                  >
                    <span className="contact-save-button">Save</span>
                  </Button>
                ) : (
                  <Button
                    variant=""
                    onClick={() => {
                      setEditPhone(!editPhone);
                    }}
                  >
                    <i class="bi bi-pencil fs-6 text-light"></i>
                  </Button>
                )}
              </td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <ContactCard />
      )}
    </div>
  );
};
export default Contact;
