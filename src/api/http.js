import axios from "axios";
import { handleResponse } from "./utils";

export const baseURL = "http://172.16.8.191:8091/v1/"

export const axiosInstance = axios.create({
  baseURL,
  timeout: 8000,
  headers: { "Content-type": "application/json;charset=utf-8" }
});

// ----------------interceptors----------------

axiosInstance.interceptors.response.use(
  response => {
    return handleResponse(response);
  }
);