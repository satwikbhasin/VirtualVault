import AdminNavbar from "../components/adminNavbar";
import { Button, Container, Table, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getContact } from "../services/contactAPIs";
import ContactCard from "../components/contactCard.js";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import "../styling/contactCard.css";
import "../styling/text-styling.css";
import { PencilIcon } from "@primer/octicons-react";
import { updateContact } from "../services/contactAPIs";

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

  const toggleEditName = () => {
    setEditName(!editName);
  };

  const toggleEditEmail = () => {
    setEditEmail(!editEmail);
  };

  const toggleEditWhatsapp = () => {
    setEditWhatsapp(!editWhatsapp);
  };

  const toggleEditPhone = () => {
    setEditPhone(!editPhone);
  };

  const handleUpdateContact = async () => {
    try {
      await updateContact(contact);
    } catch (error) {
      console.log(error);
    }
  };

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
    <>
      <AdminNavbar />
      <Container className="text-center mt-3">
      <div className="mt-3 d-flex justify-content-center">
        <BootstrapSwitchButton
          checked={false}
          onlabel={<span style={{ padding: "4px" }}>Edit</span>}
          offlabel={<span style={{ padding: "4px" }}>Edit</span>}
          width={80}
          onstyle="dark"
          onChange={() => setIsEditMode(!isEditMode)}
        />
      </div>
        {isEditMode ? (
          <Table className="mt-4">
            <thead>
              <tr>
                <th style={{ width: "200px" }}>Component</th>
                <th style={{ width: "400px" }}>Value</th>
                <th style={{ width: "200px" }}>Visibility</th>
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
                <td>Enabled</td>
                <td>
                  {editName ? (
                    <Button
                      variant=""
                      onClick={() => {
                        toggleEditName();
                        handleUpdateContact();
                      }}
                    >
                      <span className="text-success">Save</span>
                    </Button>
                  ) : (
                    <Button
                      variant=""
                      onClick={() => {
                        toggleEditName();
                      }}
                    >
                      <PencilIcon size={24} />
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
                <td>Enabled</td>
                <td>
                  {editEmail ? (
                    <Button
                      variant=""
                      onClick={() => {
                        toggleEditEmail();
                        handleUpdateContact();
                      }}
                    >
                      <span className="text-success">Save</span>
                    </Button>
                  ) : (
                    <Button
                      variant=""
                      onClick={() => {
                        toggleEditEmail();
                      }}
                    >
                      <PencilIcon size={24} />
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
                <td>Enabled</td>
                <td>
                  {editWhatsapp ? (
                    <Button
                      variant=""
                      onClick={() => {
                        toggleEditWhatsapp();
                        handleUpdateContact();
                      }}
                    >
                      <span className="text-success">Save</span>
                    </Button>
                  ) : (
                    <Button
                      variant=""
                      onClick={() => {
                        toggleEditWhatsapp();
                      }}
                    >
                      <PencilIcon size={24} />
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
                <td>Enabled</td>
                <td>
                  {editPhone ? (
                    <Button
                      variant=""
                      onClick={() => {
                        toggleEditPhone();
                        handleUpdateContact();
                      }}
                    >
                      <span className="text-success">Save</span>
                    </Button>
                  ) : (
                    <Button
                      variant=""
                      onClick={() => {
                        toggleEditPhone();
                      }}
                    >
                      <PencilIcon size={24} />
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
