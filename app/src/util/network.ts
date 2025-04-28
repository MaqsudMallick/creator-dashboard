import axios from "axios";

const network = axios.create({
  baseURL: "http://localhost:3456",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

network.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    if (error.response?.status === 401) {
      location.href = "/signin";
    }
    return Promise.reject(error);
  },
);

export default network;
