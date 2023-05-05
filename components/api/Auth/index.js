import axios from "axios";
import constants from "../../constants";

const { BASE_URL } = constants;

const API = axios.create({ baseURL: BASE_URL });

// Login User
export const loginUser = async (values, mode) => {
  const url = mode === "Admin" ? "/api/admin/login" : "/api/users/login";
  const response = await API({
    method: "POST",
    url: url,
    data: values,
  });

  return response.data;
};

// Register User

export const registerUser = async (values, mode) => {
  const url = mode === "Admin" ? "/api/admin" : "/api/users";
  const response = await API({
    method: "POST",
    url: url,
    data: values,
  });

  return response.data;
};

export const getAllCategories = async () => {
  const url = "/api/category/getAllCat";
  const response = await API({
    method: "GET",
    url: url,
  });
  return response.data.data;
};

export const getNgoByCategoryId = async (catId) => {
  const url = `/api/ngo/getByCategory/${catId}`;
  const response = await API({
    method: "GET",
    url: url,
  });
  return response.data.data;
};

export const addNgo = async (value) => {
  console.log("+++VALUUE", value);
  const url = "/api/ngo/addNgos";
  const response = await API({
    method: "POST",
    url: url,
    data: value,
  });
  return response.data.data;
};
