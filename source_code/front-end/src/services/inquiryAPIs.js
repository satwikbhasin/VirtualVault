import axios from "axios";

export const getInquiries = () => {
  return axios.get("http://localhost:3001/inquiry/getInquiries");
};

export const addInquiry = (inquiryForm, product) => {
  return axios.post("http://localhost:3001/inquiry/addInquiry", {
    inquiryForm,
    product,
  });
};
