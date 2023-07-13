import React from "react";
import AdminNavbar from "../../components/adminNavbar/adminNavbar.js";
import { getInquiries } from "../../services/inquiryAPIs.js";
import { useState, useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { IconButton, Button, Tabs, Tab } from "@mui/material";
import { handleDeleteInquiry, handleSetInquiryStatus } from "./helper.js";
import { calculateElapsedTime } from "../../services/utilityFunctions.js";
import { Modal } from "react-bootstrap";
import "../../styling/theme.css";
import "../../styling/adminInquiries.css";

const Inquires = () => {
  var [inquiryMap, setInquiryMap] = useState(new Map());
  const [totalInquiryCount, setTotalInquiryCount] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [inquiryToDelete, setInquiryToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState("unread");

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

  const filteredInquiries = useMemo(() => {
    switch (activeTab) {
      case "read":
        return Array.from(inquiryMap.values()).filter(
          (inquiry) => inquiry.read
        );
      case "unread":
        return Array.from(inquiryMap.values()).filter(
          (inquiry) => !inquiry.read
        );
      default:
        return Array.from(inquiryMap.values());
    }
  }, [inquiryMap, activeTab]);

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

  const handleChange = (event, tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <AdminNavbar />
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div className="primary-bg page-header">
          <Tabs
            className="status-tabs"
            value={activeTab}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="primary"
          >
            <Tab
              className="status-tab"
              value="unread"
              label={
                <div>
                  <span className="tab-label">Unread</span>
                  <span className="count-circle">
                    {
                      Array.from(inquiryMap.values()).filter(
                        (inquiry) => !inquiry.read
                      ).length
                    }
                  </span>
                </div>
              }
            />
            <Tab
              className="status-tab"
              value="read"
              label={
                <div>
                  <span className="tab-label">Read</span>
                  <span className="count-circle">
                    {
                      Array.from(inquiryMap.values()).filter(
                        (inquiry) => inquiry.read
                      ).length
                    }
                  </span>
                </div>
              }
            />
            <Tab
              className="status-tab"
              value="all"
              label={
                <div>
                  <span className="tab-label">All</span>
                  <span className="count-circle">{totalInquiryCount}</span>
                </div>
              }
            />
          </Tabs>
        </div>
        <div className="primary-bg full-screen-bg">
          <MaterialReactTable
            columns={columns}
            data={filteredInquiries}
            enableRowActions={true}
            enablePinning
            height="100%"
            displayColumnDefOptions={{
              "mrt-row-actions": {
                header: "Actions",
              },
            }}
            icons={{
              SearchIcon: () => <i class="bi bi-search fs-6 text-light"></i>,
              SearchOffIcon: () => <i class="bi bi-x fs-4 text-light"></i>,
              FilterListIcon: () => (
                <i class="bi bi-funnel fs-6 text-light "></i>
              ),
              FilterListOffIcon: () => (
                <i class="bi bi-funnel-fill fs-6 text-light"></i>
              ),
              CloseIcon: () => <i class="bi bi-x fs-4 text-dark"></i>,
              ViewColumnIcon: () => <i class="bi bi-eye fs-6 text-light"></i>,
              DensityLargeIcon: () => (
                <i class="bi bi-arrows-fullscreen fs-6 text-light"></i>
              ),
              DensityMediumIcon: () => (
                <i class="bi bi-bounding-box fs-6 text-light"></i>
              ),
              DensitySmallIcon: () => (
                <i class="bi bi-arrows-angle-contract fs-6 text-light"></i>
              ),
              FullscreenExitIcon: () => (
                <i class="bi bi-fullscreen-exit fs-6 text-light"></i>
              ),
              FullscreenIcon: () => (
                <i class="bi bi-fullscreen fs-6 text-light"></i>
              ),
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
            muiSearchTextFieldProps={{
              sx: {
                backgroundColor: "#DDE6ED",
                color: "#DDE6ED",
              },
            }}
            muiTableHeadCellFilterTextFieldProps={{
              sx: {
                backgroundColor: "#DDE6ED",
                color: "#DDE6ED",
              },
            }}
            muiTableHeadProps={{
              sx: {
                backgroundColor: "#DDE6ED",
                color: "#DDE6ED",
              },
            }}
            muiTableHeadCellColumnActionsButtonProps={{
              sx: {
                color: "#DDE6ED",
              },
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
            renderRowActions={({ row }) => [
              <IconButton key={0} sx={{ m: 0 }}>
                <a
                  href={`mailto:${row.original.email}?subject=Regrding your inquiry for ${row.original.productName} at Healthkare&body=Hello ${row.original.name}, Thank you for your inquiry stated as:%0D%0A%0D%0A"${row.original.message}" %0D%0A%0D%0AThankyou,%0D%0AHealthkare`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="contact-small-font no-underline"
                >
                  <div className="d-flex align-items-center justify-content-center text-light">
                    <i class="bi bi-reply-fill fs-4 me-1"></i>
                    <span>Reply</span>
                  </div>
                </a>
              </IconButton>,
              <IconButton
                key={0}
                sx={{ m: 0 }}
                onClick={() => {
                  setShowDeleteModal(true);
                  setInquiryToDelete(row.original._id);
                }}
              >
                <div className="d-flex align-items-center justify-content-center text-light contact-small-font">
                  <i class="bi bi-trash3 fs-5 me-1"></i>
                  <span>Delete</span>
                </div>
              </IconButton>,
              <IconButton
                key={0}
                sx={{ m: 0 }}
                onClick={() => {
                  if (row.original.read) {
                    handleSetInquiryStatus(row.original._id, false);
                  } else {
                    handleSetInquiryStatus(row.original._id, true);
                  }
                }}
              >
                {row.original.read ? (
                  <div className="d-flex align-items-center justify-content-center text-light contact-small-font">
                    <i class="bi bi-book-half fs-5 me-1"></i>
                    <span>Mark as Unread</span>
                  </div>
                ) : (
                  <div className="d-flex align-items-center justify-content-center text-light contact-small-font">
                    <i class="bi bi-book fs-5 me-1"></i>
                    <span>Mark as Read</span>
                  </div>
                )}
              </IconButton>,
            ]}
          />
        </div>
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
