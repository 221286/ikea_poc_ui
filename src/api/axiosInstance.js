import axios from "axios";

const headers = {
  "Content-Type": "application/json",
};
export const axiosInstanceNoAuth = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  // timeout: 5000,
  headers: {
    ...headers,
  },
});

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  // timeout: 25000,
  headers: {
    ...headers,
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // const token = await useAuthHeader();
    let token = localStorage.getItem("access_token");
    if (!token?.includes("Bearer")) {
      token = "Bearer " + token;
    }
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
