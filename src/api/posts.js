import api from "./axios";

export const getPosts = async () => {
  const { data } = await api.get("/posts");
  return data;
};

export const getPost = async (id) => {
  const { data } = await api.get(`/posts/${id}`);
  return data;
};

export const searchPosts = async (q) => {
  const { data } = await api.get(`/posts/search?q=${q}`);
  return data;
};

export const createPost = async (postData) => {
  const { data } = await api.post("/posts", postData);
  return data;
};

export const updatePost = async (id, postData) => {
  const { data } = await api.put(`/posts/${id}`, postData);
  return data;
};

export const deletePost = async (id) => {
  await api.delete(`/posts/${id}`);
};
