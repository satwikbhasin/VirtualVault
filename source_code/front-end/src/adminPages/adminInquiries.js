import React from "react";
import AdminNavbar from "../components/adminNavbar/adminNavbar.js";
import { getInquiries } from "../services/inquiryAPIs";
import { useState, useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { IconButton, MenuItem } from "@mui/material";

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
      >
        <h5 className="mt-4 fw-bold mb-4">
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
              "mrt-row-actions",
            ],
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
                  <div className="d-flex align-items-center justify-content-center"> 
                    <i class="bi bi-reply-fill fs-4 me-1"></i>
                    <span>Reply</span>
                  </div>
                </a>
              </IconButton>
            </MenuItem>,
          ]}
        />
      </div>
    </>
  );
};
export default Inquires;
