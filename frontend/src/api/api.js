import axios from "axios";

// console.log(process.env.VITE_BACKEND_URL)

// export const baseURL = 'http://192.168.1.3:8005/api'
export const baseURL = 'http://localhost:8005/api'
// export const baseURL = 'https://sunnyagencies-m1wy.onrender.com/api'
// export const baseURL = 'http://192.168.1.16:8005/api'
// export const baseURL = 'http://192.168.1.19:8005/api'
// export const baseURL = 'http://192.168.1.14:8005/api'


   
export const api = axios.create({
  baseURL: baseURL,
  timeout: 1000 * 60,
  withCredentials: true,
  headers: {
    authorization: `Bearer ${document.cookie.split(";")}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});


export const api_for_pdf = axios.create({
  baseURL: baseURL,
  timeout: 1000 * 70,
  withCredentials: true,
  headers: {
    authorization: `Bearer ${document.cookie.split(";")}`,
    Accept: "application/pdf",
    "Content-Type": "application/json",
  },
});


export const backend_start_api = async()=>{
  try{
    const {data} = await api.get("/health");
    return data;
  }
  catch(err){
    console.log(err);
  }
}