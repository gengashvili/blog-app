import axios from "axios";

const API_URL = import.meta.env.VITE_API_URI;
const authToken = import.meta.env.VITE_AUTH_TOKEN;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: authToken,
  },
});

export const registerUser = async (username, password, image) => {
  try {
    const response = await axiosInstance.post("/auth/register", {
      username,
      password,
      image,
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
