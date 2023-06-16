import AdminLogin from "../adminPages/adminLogin.js";
import AdminHome from "../adminPages/adminHome.js";
import AdminInventory from "../adminPages/adminInventory.js";
import isLoggedIn from "./loginVerification.js";

export const LoginAuthentication = () => {
  return isLoggedIn() ? <AdminHome /> : <AdminLogin />;
};

export const HomeAuthentication = () => {
  return isLoggedIn() ? <AdminHome /> : <AdminLogin />;
};

export const InventoryAuthentication = () => {
  return isLoggedIn() ? <AdminInventory /> : <AdminLogin />;
};
