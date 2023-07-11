import { deleteInquiry } from "../../services/inquiryAPIs";

export const handleDeleteInquiry = async (inquiryId) => {
  await deleteInquiry(inquiryId).then(() => {
    window.location.reload();
  });
};
