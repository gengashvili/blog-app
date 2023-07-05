import axios from "axios";

const API_URL = import.meta.env.VITE_API_URI;
const authToken = import.meta.env.VITE_AUTH_TOKEN;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  },
});

const storeToken = (token) => {
  localStorage.setItem("authToken", token);
};

const getToken = () => {
  return localStorage.getItem("authToken");
};

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (username, password, image) => {
  try {
    const response = await axiosInstance.post("/auth/register", {
      username,
      password,
      image,
    });
    const token = response.data.token;

    storeToken(token);

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      username,
      password,
    });
    const token = response.data.token;

    storeToken(token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getPosts = async () => {
  try {
    const response = await axiosInstance.get("/posts/");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getPostById = async (postId) => {
  try {
    const response = await axiosInstance.get(`/posts/${postId}`);
    return response.data.post;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching the post.");
  }
};

export const createPost = async (title, summary, image, content, author) => {
  try {
    const response = await axiosInstance.post("/posts/", {
      title,
      summary,
      image,
      content,
      author,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await axiosInstance.delete(`/posts/${postId}`);
    return response.data.message;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const updatePost = async (postId, updatedPost) => {
  try {
    const response = await axiosInstance.put(`/posts/${postId}`, updatedPost);
    return response.data.post;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
