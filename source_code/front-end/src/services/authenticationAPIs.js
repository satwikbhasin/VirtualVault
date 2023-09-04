import Axios from "axios";
import Backend from "../assets/backendLink";

export const loginAdmin = (email, password) => {
  return Axios.post({Backend} + "/users/login", {
    email: email,
    password: password,
  });
};
