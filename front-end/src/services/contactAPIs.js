import Axios from "axios";

export const getContact = () => {
  return Axios.get("http://localhost:3001/contactDetails/getContactDetails");
};

export const updateContact = (contactDetails) => {
  return Axios.put(
    "http://localhost:3001/contactDetails/updateContactDetails",
    contactDetails
  );
};
