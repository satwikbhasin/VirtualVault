import axios from "axios";

export const getInquiries = async () => {
  return axios.get("http://localhost:3001/inquiry/getInquiries");
};

export const addInquiry = async  (inquiryForm, product) => {
  return axios.post("http://localhost:3001/inquiry/addInquiry", {
    inquiryForm,
    product,
  });
};

export const deleteInquiry = async (inquiryId) => {
  return axios.delete("http://localhost:3001/inquiry/deleteInquiry", {
    data: {
      inquiryId,
    },
  });
};
