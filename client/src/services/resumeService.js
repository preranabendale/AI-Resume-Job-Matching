import API from "./api";

export const uploadResume = async (formData) => {
  const response = await API.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};