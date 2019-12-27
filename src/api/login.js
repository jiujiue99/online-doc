import { axiosInstance } from './http'

export const apiLogin = (params) => {
  return axiosInstance.get('login', params);
}