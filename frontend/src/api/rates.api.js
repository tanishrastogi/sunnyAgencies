import { api } from "./api";

const fetchRatesApi = async (payload) => {
  try {
    const { data } = await api.post(`/rates/fetch/all?page=${payload.page}`, payload);
    console.log(data)
    return data;
  }
  catch (err) {
    console.log(err);
  }
}

export {fetchRatesApi}