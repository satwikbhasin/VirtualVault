import Axios from "axios";
import Backend from "../assets/BackendLink.js";

export const loginAdmin = (email, password) => {
  return Axios.post(Backend + "/users/login", {
    email: email,
    password: password,
  });
};
