import api from "./api";

/*
|--------------------------------------------------------------------------
| Public Settings
|--------------------------------------------------------------------------
*/

const getSettings = async () => {
  const response = await api.get(
    "/settings"
  );

  return response.data;
};


/*
|--------------------------------------------------------------------------
| Admin Settings
|--------------------------------------------------------------------------
*/

const getAdminSettings = async () => {
  const response = await api.get(
    "/admin/settings"
  );

  return response.data;
};


/*
|--------------------------------------------------------------------------
| Update Admin Settings
|--------------------------------------------------------------------------
*/

const updateAdminSettings = async (
  settings
) => {
  const response = await api.put(
    "/admin/settings",
    settings
  );

  return response.data;
};


const settingService = {
  getSettings,
  getAdminSettings,
  updateAdminSettings,
};

export default settingService;