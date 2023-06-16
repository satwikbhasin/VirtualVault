const isLoggedIn = () => {
  const tokenCookie = document.cookie
    .split(";")
    .find((cookie) => cookie.startsWith("token="));

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  return tokenCookie || token;
};

export default isLoggedIn;
