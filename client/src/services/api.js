import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-resume-job-matching-api.onrender.com/api",
});

API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;