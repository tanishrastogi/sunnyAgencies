import axios from "axios";

// console.log(process.env.VITE_BACKEND_URL)

export const baseURL = 'http://192.168.1.13:8005/api'
// export const baseURL = 'http://192.168.1.16:8005/api'
// export const baseURL = 'http://192.168.1.19:8005/api'
   
export const api = axios.create({
  baseURL: baseURL,
  timeout: 1000 * 10,
  withCredentials: true,
  headers: {
    authorization: `Bearer ${document.cookie.split(";")}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});