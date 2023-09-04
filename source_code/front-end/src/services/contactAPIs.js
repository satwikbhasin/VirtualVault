import Axios from "axios";
import Backend from "../assets/backendLink";

export const getContact = () => {
  return Axios.get({Backend} + "/contactDetails/getContactDetails");
};

export const updateContact = (contactDetails) => {
  return Axios.put(
    {Backend} + "/contactDetails/updateContactDetails",
    contactDetails
  );
};
