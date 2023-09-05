import axios from "axios";
import Backend from "../assets/backendLink.js";

export const getInquiries = async () => {
  return axios.get(Backend + "/inquiry/getInquiries");
};

export const addInquiry = async (inquiryForm, product) => {
  return axios.post(Backend + "/inquiry/addInquiry", {
    inquiryForm,
    product,
  });
};

export const deleteInquiry = async (inquiryId) => {
  return axios.delete(Backend + "/inquiry/deleteInquiry", {
    data: {
      inquiryId,
    },
  });
};

export const setInquiryStatus = async (inquiryId, status) => {
  return axios.put(Backend + "/inquiry/setInquiryStatus", {
    inquiryId,
    status,
  });
};
