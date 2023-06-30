import AdminLogin from "../adminPages/adminLogin.js";
import AdminHome from "../adminPages/adminHome.js";
import AdminInventory from "../adminPages/adminInventory.js";
import AdminContact from "../adminPages/adminContact.js";

import isLoggedIn from "./loginVerification.js";

const RouteProtection = ({ route }) => {
  if (isLoggedIn()) {
    if (route === "/admin/login") {
      return <AdminHome />;
    } else if (route === "/admin/home") {
      return <AdminHome />;
    } else if (route === "/admin/inventory") {
      return <AdminInventory />;
    } else if (route === "/admin/contact") {
      return <AdminContact />;
    }
  } else {
    return <AdminLogin route={route} />;
  }
};

export default RouteProtection;
