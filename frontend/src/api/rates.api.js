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


const fetchRatesByID = async (payload) => {
  try {
    const { data } = await api.post(`/rates/fetch/id`, payload);
    return data
  }
  catch (err) {
    console.log(err);
  }
}

export { fetchRatesApi, fetchRatesByID }