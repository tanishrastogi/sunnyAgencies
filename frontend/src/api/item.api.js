import { api } from "./api";

const fetchItemDataApi = async(payload) => {
  try {
    const { data } = await api.post('/item', payload)
    return data 
  }
  catch (err) {
    console.log(err);
  }
}

export {
  fetchItemDataApi
}
