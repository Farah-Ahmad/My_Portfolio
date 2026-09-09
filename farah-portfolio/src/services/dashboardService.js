import api from "./api";

const getDashboard = async () => {
  const response = await api.get(
    "/admin/dashboard"
  );

  return response.data;
};

const dashboardService = {
  getDashboard,
};

export default dashboardService;