import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:7174/api",
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

