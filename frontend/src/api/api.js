import axios from "axios";

// console.log(process.env.VITE_BACKEND_URL)

export const baseURL = 'http://192.168.1.3:8005/api'
// export const baseURL = 'http://192.168.1.13:8005/api'
// export const baseURL = 'http://192.168.1.16:8005/api'
// export const baseURL = 'http://192.168.1.19:8005/api'
// export const baseURL = 'http://192.168.1.14:8005/api'

// const ipaddressHandler = async()=>{
//   try{
//     let i=0;
//     while(i<254){
//       const ipaddress = `http://192.168.1.${i}:8005/api`
//       const result = await api.get("/ip-test");
//       if(result === "test-successfull"){
//         return ipaddress;
//       }

//       i=i+1;

//     }
//   }
//   catch(err){
//     console.log(err);
//   }
// }
   
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
