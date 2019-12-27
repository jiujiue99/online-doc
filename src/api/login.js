import { axiosInstance } from './http'

export const apiLogin = (params) => {
  return axiosInstance.post('login', params);
}