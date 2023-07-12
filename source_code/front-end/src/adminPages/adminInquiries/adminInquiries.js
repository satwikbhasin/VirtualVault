import React from "react";
import AdminNavbar from "../../components/adminNavbar/adminNavbar.js";
import { getInquiries } from "../../services/inquiryAPIs.js";
import { useState, useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { IconButton, MenuItem, Button } from "@mui/material";
import { handleDeleteInquiry } from "./helper.js";
import { calculateElapsedTime } from "../../services/utilityFunctions.js";
import { Modal } from "react-bootstrap";
import "../../styling/theme.css";

const Inquires = () => {
  var [inquiryMap, setInquiryMap] = useState(new Map());
  const [totalInquiryCount, setTotalInquiryCount] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [inquiryToDelete, setInquiryToDelete] = useState(null);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        if (inquiryMap.size > 0) {
          return;
        } else {
          const inquiries = await getInquiries();
          const updatedInquiries = inquiries.data.map((inquiry) => ({
            ...inquiry,
            date: calculateElapsedTime(new Date(inquiry.date)),
          }));
          setInquiryMap(
            new Map(updatedInquiries.map((inquiry) => [inquiry._id, inquiry]))
          );
          setTotalInquiryCount(inquiries.data.length);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchInquiries();
  }, [inquiryMap.size]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 100,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 100,
      },
      {
        accessorKey: "phone",
        header: "Phone",
        size: 100,
      },
      {
        accessorKey: "company",
        header: "Company",
        size: 100,
      },
      {
        accessorKey: "productName",
        header: "Product",
        size: 100,
      },
      {
        accessorKey: "message",
        header: "Inquiry",
        size: 100,
      },
      {
        accessorKey: "date",
        header: "Recieved",
        size: 100,
      },
    ],
    []
  );

  return (
    <>
      <AdminNavbar />
      <div
        style={{
          textAlign: "center",
        }}
        className="ternary-bg"
      >
        <h5 className="text-light fw-bold p-4">
          Inquiry Count: {totalInquiryCount}
        </h5>
        <MaterialReactTable
          columns={columns}
          data={Array.from(inquiryMap.values())}
          enableRowActions={true}
          enablePinning
          displayColumnDefOptions={{
            "mrt-row-actions": {
              header: "Actions",
            },
          }}
          initialState={{
            columnOrder: [
              "name",
              "email",
              "phone",
              "company",
              "productName",
              "message",
              "date",
              "mrt-row-actions",
            ],
          }}
          muiTableBodyRowProps={{
            hover: false,
            sx: {
              backgroundColor: "#2d383c",
            },
          }}
          muiTablePaperProps={{
            sx: {
              color: "#2d383c",
              backgroundColor: "#2d383c",
            },
          }}
          muiTableBodyCellProps={{
            sx: {
              color: "#DDE6ED",
              backgroundColor: "#2d383c",
            },
          }}
          muiTableDetailPanelProps={{
            sx: {
              backgroundColor: "#2d383c",
              color: "#DDE6ED",
            },
          }}
          muiTableHeadCellProps={{
            sx: {
              color: "#DDE6ED",
              backgroundColor: "#414c50",
            },
          }}
          muiBottomToolbarProps={{
            sx: {
              backgroundColor: "#414c50",
              color: "#DDE6ED",
            },
          }}
          muiTopToolbarProps={{
            sx: {
              backgroundColor: "#414c50",
              color: "#DDE6ED",
            },
          }}
          muiTablePaginationProps={{
            sx: {
              backgroundColor: "#414c50",
              color: "#DDE6ED",
            },
          }}
          renderRowActionMenuItems={({ row }) => [
            <MenuItem sx={{ height: "15px" }}>
              <IconButton key={0} sx={{ m: 0 }}>
                <a
                  href={`mailto:${row.original.email}?subject=Regrding your inquiry for ${row.original.productName} at Healthkare&body=Hello ${row.original.name}, Thank you for your inquiry stated as:%0D%0A%0D%0A"${row.original.message}" %0D%0A%0D%0AThankyou,%0D%0AHealthkare`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="contact-small-font no-underline"
                >
                  <div className="d-flex align-items-center justify-content-center text-dark">
                    <i class="bi bi-reply-fill fs-4 me-1"></i>
                    <span>Reply</span>
                  </div>
                </a>
              </IconButton>
            </MenuItem>,
            <MenuItem sx={{ height: "25px" }}>
              <IconButton
                key={0}
                sx={{ m: 0 }}
                onClick={() => {
                  setShowDeleteModal(true);
                  setInquiryToDelete(row.original._id);
                }}
              >
                <div className=" mt-3 d-flex align-items-center justify-content-center text-dark contact-small-font">
                  <i class="bi bi-trash3 fs-5 me-1"></i>
                  <span>Delete</span>
                </div>
              </IconButton>
            </MenuItem>,
          ]}
        />
      </div>

      <Modal
        className="modal-form"
        show={showDeleteModal}
        onHide={() => {
          setShowDeleteModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Inquiry</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this inquiry?</Modal.Body>
        <Modal.Footer>
          <Button
            className="text-light cancel-button"
            onClick={() => {
              setShowDeleteModal(false);
            }}
          >
            <div className="d-flex align-items-center">
              <i class="bi bi-x-circle-fill fs-4"></i>
              <span className="ms-1">Cancel</span>
            </div>
          </Button>
          <Button
            className="text-danger save-button"
            variant=""
            onClick={() => {
              handleDeleteInquiry(inquiryToDelete);
            }}
          >
            <div className="d-flex align-items-center">
              <i class="bi bi-check-circle-fill fs-4"></i>
              <span className="ms-1">Confirm</span>
            </div>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Inquires;
