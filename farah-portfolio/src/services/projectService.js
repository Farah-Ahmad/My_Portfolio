import api from "./api";

/* =========================
   PUBLIC PROJECTS
========================= */

const getProjects = async () => {
  const response = await api.get(
    "/projects"
  );

  return response.data;
};

const getProjectBySlug = async (slug) => {
  const response = await api.get(
    `/projects/${slug}`
  );

  return response.data;
};


/* =========================
   ADMIN PROJECTS
========================= */

const getAdminProjects = async (
  page = 1
) => {
  const response = await api.get(
    "/admin/projects",
    {
      params: {
        page,
      },
    }
  );

  return response.data;
};

const getAdminProject = async (id) => {
  const response = await api.get(
    `/admin/projects/${id}`
  );

  return response.data;
};

const createProject = async (
  projectData
) => {
  const response = await api.post(
    "/admin/projects",
    projectData
  );

  return response.data;
};

const updateProject = async (
  id,
  projectData
) => {
  const response = await api.put(
    `/admin/projects/${id}`,
    projectData
  );

  return response.data;
};

const deleteProject = async (id) => {
  const response = await api.delete(
    `/admin/projects/${id}`
  );

  return response.data;
};


/* =========================
   PROJECT IMAGES
========================= */

const uploadProjectImages = async (
  projectId,
  files
) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append(
      "images[]",
      file
    );
  });

  const response = await api.post(
    `/admin/projects/${projectId}/images`,
    formData
  );

  return response.data;
};

const deleteProjectImage = async (
  projectId,
  imageId
) => {
  const response = await api.delete(
    `/admin/projects/${projectId}/images/${imageId}`
  );

  return response.data;
};


const projectService = {
  getProjects,
  getProjectBySlug,

  getAdminProjects,
  getAdminProject,

  createProject,
  updateProject,
  deleteProject,

  uploadProjectImages,
  deleteProjectImage,
};

export default projectService;