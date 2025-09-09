import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const registerUser = async (userData) => {
  const res = await axios.post(`${backendUrl}/users/register`, userData);
  return res.data;
};

export const loginUser = async (userData) => {
  const res = await axios.post(`${backendUrl}/users/login`, userData);
  return res.data;
};


export const deleteResume = async (id, token) => {
  const res = await axios.delete(`${backendUrl}/resumes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const findResume = async (id, token) => {
  const res = await axios.get(`${backendUrl}/resumes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

export const updateResume = async (id, resumeData, token) => {
  const res = await axios.put(`${backendUrl}/resumes/${id}`, resumeData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createResume = async (resumeData, token) => {
  const res = await axios.post(`${backendUrl}/resumes`, resumeData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getResumes = async (token) => {
  const res = await axios.get(`${backendUrl}/resumes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
