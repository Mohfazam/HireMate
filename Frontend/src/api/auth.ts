import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

interface AuthData {
  name?: string;
  email: string;
  password: string;
  company?: string;
}

export const jobSeekerSignup = async (data: AuthData) => {
  return axios.post(`${API_URL}/jobseeker/signup`, data);
};

export const jobSeekerSignin = async (data: AuthData) => {
  return axios.post(`${API_URL}/jobseeker/signin`, data);
};

export const recruiterSignup = async (data: AuthData) => {
  return axios.post(`${API_URL}/recruiter/signup`, data);
};

export const recruiterSignin = async (data: AuthData) => {
  return axios.post(`${API_URL}/recruiter/signin`, data);
};