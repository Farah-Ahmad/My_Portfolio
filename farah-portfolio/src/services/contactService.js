import api from "./api";

const sendMessage = async (formData) => {
  const response = await api.post(
    "/contact",
    formData
  );

  return response.data;
};

const contactService = {
  sendMessage,
};

export default contactService;