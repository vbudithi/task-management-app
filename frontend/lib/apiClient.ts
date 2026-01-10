import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_DOMAIN,
  withCredentials: true, 
});

export default apiClient;

