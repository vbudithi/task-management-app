import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Request interceptor to add JWT token to headers
apiClient.interceptors.request.use(config => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  
  }
  return config;
}, error => Promise.reject(error));

export default apiClient;

