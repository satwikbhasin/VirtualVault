import Axios from "axios";

export const loginAdmin = (email, password) => {
  return Axios.post("http://localhost:3001/users/login", {
    email: email,
    password: password,
  });
};
