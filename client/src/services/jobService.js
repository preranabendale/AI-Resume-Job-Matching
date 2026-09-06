import API from "./api";

export const getJobs = async () => {
  const response = await API.get("/jobs");

  return response.data;
};