import React from "react";
import AdminNavbar from "../components/adminNavbar/adminNavbar.js";
import { getInquiries } from "../services/inquiryAPIs";
import { Container, Table } from "react-bootstrap";
import { useState, useEffect } from "react";

const Inquires = () => {
  var [inquiryMap, setInquiryMap] = useState(new Map());
  const [totalInquiryCount, setTotalInquiryCount] = useState(0);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        if (inquiryMap.size > 0) {
          return;
        } else {
          const inquiries = await getInquiries();
          setInquiryMap(
            new Map(inquiries.data.map((inquiry) => [inquiry._id, inquiry]))
          );
          setTotalInquiryCount(inquiries.data.length);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchInquiries();
  }, [inquiryMap]);
  return (
    <>
      <AdminNavbar />
      <Container
        style={{
          textAlign: "center",
        }}
      >
        <h5 className="mt-4 fw-bold mb-4">
          Inquiry Count: {totalInquiryCount}
        </h5>
        <Table>
          <thead>
            <tr>
              <th>From</th>
              <th>Inquiry</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(inquiryMap.values()).map((inquiry) => (
              <tr key={inquiry._id}>
                <td style={{ width: "650px" }}>
                  <p>Name: {inquiry.name}</p>
                  <p>Email: {inquiry.email}</p>
                  <p>Phone: {inquiry.phone}</p>
                  <p> Company/Firm: {inquiry.company}</p>
                </td>
                <td style={{ width: "650px" }}>{inquiry.message}</td>
                <td style={{ width: "650px" }}>
                  <a
                    href={`mailto:${inquiry.email}?subject=Regrding your inquiry for ${inquiry.productName} at Healthkare&body=Hello ${inquiry.name}, Thank you for your inquiry stated as:%0D%0A%0D%0A"${inquiry.message}" %0D%0A%0D%0AThankyou,%0D%0AHealthkare`}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="contact-small-font no-underline"
                  >
                    <i class="bi bi-reply-fill fs-4"></i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};
export default Inquires;
