import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const login = (data: { email: string; password: string }) =>
  API.post("/api/auth/login", data);

export const register = (data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => API.post("/api/auth/register", data);

// Add more endpoints later
export default API;
console.log("API base URL:", import.meta.env.VITE_API_URL);
