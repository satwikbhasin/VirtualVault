import { deleteInquiry, setInquiryStatus } from "../../services/inquiryAPIs";

export const handleDeleteInquiry = async (inquiryId) => {
  await deleteInquiry(inquiryId).then(() => {
    window.location.reload();
  });
};

export const handleSetInquiryStatus = async (inquiryId, status) => {
  if (inquiryId !== "" && inquiryId !== null) {
    await setInquiryStatus(inquiryId, status).then(() => {
      window.location.reload();
    });
  }
};
