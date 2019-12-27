import axios from "axios";
import { handleResponse } from "./utils";
import mockInit from './mock'

export const baseURL = "http://localhost:8091/"

const axiosInstance = axios.create({
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

mockInit(axiosInstance)

export { axiosInstance }