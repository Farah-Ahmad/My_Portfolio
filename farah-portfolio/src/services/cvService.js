import api from "./api";

/* =========================
   PUBLIC
========================= */

const getCurrentCv = async () => {
  const response = await api.get(
    "/cv/current"
  );

  return response.data;
};


/* =========================
   ADMIN
========================= */

const getAdminCv = async () => {
  const response = await api.get(
    "/admin/cv"
  );

  return response.data;
};

const uploadCv = async (file) => {
  const formData = new FormData();

  formData.append(
    "cv",
    file
  );

  const response = await api.post(
    "/admin/cv",
    formData
  );

  return response.data;
};

const deleteCv = async () => {
  const response = await api.delete(
    "/admin/cv"
  );

  return response.data;
};

const cvService = {
  getCurrentCv,

  getAdminCv,
  uploadCv,
  deleteCv,
};

export default cvService;