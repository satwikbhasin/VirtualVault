import AdminNavbar from "../components/adminNavbar/adminNavbar.js";
import { Button, Container, Table, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getContact } from "../services/contactAPIs.js";
import ContactCard from "../components/contactCard.js";
import "../styling/contactCard.css";
import "../styling/text-styling.css";
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
      } catch (error) {
        console.log(error);
      }
    };
    fetchContact();
  }, []);

  const handleUpdateContact = async () => {
    try {
      await updateContact(contact);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <Container className="text-center mt-3">
        <div className="mt-3 d-flex justify-content-center">
          <Form>
            <FormGroup>
              <FormControlLabel
                control={<Switch color="success" />}
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
          <Table className="mt-4">
            <thead>
              <tr>
                <th style={{ width: "200px" }}>Component</th>
                <th style={{ width: "400px" }}>Value</th>
                <th style={{ width: "200px" }}>Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Name</td>
                {editName ? (
                  <td>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      value={contact.name}
                      onChange={(event) =>
                        setContact({ ...contact, name: event.target.value })
                      }
                    />
                  </td>
                ) : (
                  <td>{contact.name}</td>
                )}
                <td>
                  {editName ? (
                    <Button
                      variant=""
                      onClick={() => {
                        setEditName(!editName);
                        handleUpdateContact();
                      }}
                    >
                      <span className="text-success">Save</span>
                    </Button>
                  ) : (
                    <Button
                      variant=""
                      onClick={() => {
                        setEditName(!editName);
                      }}
                    >
                      <i class="bi bi-pencil fs-6"></i>
                    </Button>
                  )}
                </td>
              </tr>
              <tr>
                <td>Email</td>
                {editEmail ? (
                  <td>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      value={contact.email}
                      onChange={(event) =>
                        setContact({ ...contact, email: event.target.value })
                      }
                    />
                  </td>
                ) : (
                  <td>{contact.email}</td>
                )}
                <td>
                  {editEmail ? (
                    <Button
                      variant=""
                      onClick={() => {
                        setEditEmail(!editEmail);
                        handleUpdateContact();
                      }}
                    >
                      <span className="text-success">Save</span>
                    </Button>
                  ) : (
                    <Button
                      variant=""
                      onClick={() => {
                        setEditEmail(!editEmail);
                      }}
                    >
                      <i class="bi bi-pencil fs-6"></i>
                    </Button>
                  )}
                </td>
              </tr>
              <tr>
                <td>Whatsapp</td>
                {editWhatsapp ? (
                  <td>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Whatsapp Number"
                      value={contact.whatsapp}
                      onChange={(event) =>
                        setContact({ ...contact, whatsapp: event.target.value })
                      }
                    />
                  </td>
                ) : (
                  <td>{contact.whatsapp}</td>
                )}
                <td>
                  {editWhatsapp ? (
                    <Button
                      variant=""
                      onClick={() => {
                        setEditWhatsapp(!editWhatsapp);
                        handleUpdateContact();
                      }}
                    >
                      <span className="text-success">Save</span>
                    </Button>
                  ) : (
                    <Button
                      variant=""
                      onClick={() => {
                        setEditWhatsapp(!editWhatsapp);
                      }}
                    >
                      <i class="bi bi-pencil fs-6"></i>
                    </Button>
                  )}
                </td>
              </tr>
              <tr>
                <td>Phone</td>
                {editPhone ? (
                  <td>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Phone Number"
                      value={contact.phone}
                      onChange={(event) =>
                        setContact({ ...contact, phone: event.target.value })
                      }
                    />
                  </td>
                ) : (
                  <td>{contact.phone}</td>
                )}
                <td>
                  {editPhone ? (
                    <Button
                      variant=""
                      onClick={() => {
                        setEditPhone(!editPhone);
                        handleUpdateContact();
                      }}
                    >
                      <span className="text-success">Save</span>
                    </Button>
                  ) : (
                    <Button
                      variant=""
                      onClick={() => {
                        setEditPhone(!editPhone);
                      }}
                    >
                      <i class="bi bi-pencil fs-6"></i>
                    </Button>
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <ContactCard />
        )}
      </Container>
    </>
  );
};
export default Contact;
