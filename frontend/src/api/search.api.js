import { api } from "./api";

const searchItems = async (payload) => {
  try {
    const word = payload.searchWord
    const { data } = await api.post(`/search/items?page=${payload.page}&limit=10`, { word });
    console.log(data)
    return data
  }
  catch (err) {
    console.log(err);
  }
}


const searchAccount = async(payload)=>{
  try{
    const word = payload.searchWord;
    const { data } = await api.post(`/search/accounts?page=${payload.page}&limit=10`, { word });
    return data
  }
  catch(err){
    console.log(err);
  }
}


export { 
  searchItems,
  searchAccount
}