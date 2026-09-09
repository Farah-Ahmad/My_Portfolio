import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    Accept: "application/json",
  },
});

/* =========================
   REQUEST INTERCEPTOR
========================= */

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("admin_token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

/* =========================
   RESPONSE INTERCEPTOR
========================= */

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    const status =
      error.response?.status;

    const isAdminPage =
      window.location.pathname.startsWith(
        "/admin"
      );

    const isLoginPage =
      window.location.pathname ===
      "/admin/login";

    if (
      (status === 401 ||
        status === 403) &&
      isAdminPage &&
      !isLoginPage
    ) {
      localStorage.removeItem(
        "admin_token"
      );

      localStorage.removeItem(
        "admin_user"
      );

      window.location.href =
        "/admin/login";
    }

    return Promise.reject(error);
  }
);

export default api;