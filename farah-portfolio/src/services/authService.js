import api from "./api";

const login = async (credentials) => {
  const response = await api.post(
    "/admin/login",
    credentials
  );

  return response.data;
};

const getCurrentAdmin = async () => {
  const response = await api.get(
    "/admin/me"
  );

  return response.data;
};

const logout = async () => {
  const response = await api.post(
    "/admin/logout"
  );

  return response.data;
};

const saveSession = (token, user) => {
  localStorage.setItem(
    "admin_token",
    token
  );

  localStorage.setItem(
    "admin_user",
    JSON.stringify(user)
  );
};

const clearSession = () => {
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_user");
};

const getStoredUser = () => {
  try {
    const user = localStorage.getItem(
      "admin_user"
    );

    return user
      ? JSON.parse(user)
      : null;
  } catch {
    return null;
  }
};

const getToken = () => {
  return localStorage.getItem(
    "admin_token"
  );
};

const authService = {
  login,
  logout,
  getCurrentAdmin,
  saveSession,
  clearSession,
  getStoredUser,
  getToken,
};

export default authService;