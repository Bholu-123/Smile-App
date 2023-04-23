import axios from "axios";
import constants from "../../constants";

const { BASE_URL } = constants;

const API = axios.create({ BASE_URL });

// Login User
export const loginUser = async (values) => {
  const url = "api/users/login";
  const response = await API.post(url, values);
  return response.data;
};

// Register User

export const registerUser = async (values) => {
  const url = "api/users";
  const response = await API.post(url, values);
  return response.data;
};
