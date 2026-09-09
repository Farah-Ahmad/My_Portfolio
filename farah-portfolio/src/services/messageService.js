import api from "./api";

const getMessages = async ({
  page = 1,
  search = "",
  status = "all",
} = {}) => {
  const params = {
    page,
  };

  if (search.trim()) {
    params.search = search.trim();
  }

  if (
    status === "read" ||
    status === "unread"
  ) {
    params.status = status;
  }

  const response = await api.get(
    "/admin/messages",
    {
      params,
    }
  );

  return response.data;
};


const getMessage = async (id) => {
  const response = await api.get(
    `/admin/messages/${id}`
  );

  return response.data;
};


const markRead = async (id) => {
  const response = await api.patch(
    `/admin/messages/${id}/read`
  );

  return response.data;
};


const markUnread = async (id) => {
  const response = await api.patch(
    `/admin/messages/${id}/unread`
  );

  return response.data;
};


const deleteMessage = async (id) => {
  const response = await api.delete(
    `/admin/messages/${id}`
  );

  return response.data;
};


/*
|--------------------------------------------------------------------------
| Reply To Message
|--------------------------------------------------------------------------
*/

const replyToMessage = async (
  id,
  data
) => {
  const response = await api.post(
    `/admin/messages/${id}/reply`,
    data
  );

  return response.data;
};


const messageService = {
  getMessages,
  getMessage,
  markRead,
  markUnread,
  deleteMessage,
  replyToMessage,
};

export default messageService;