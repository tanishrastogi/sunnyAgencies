import { api } from "./api";

const past_item_sale_data_api = async (payload) => {
  try {
    const {data}  = await api.post("/sale/past-item-sale-data", payload);
    console.log(data);
    return data;
  }
  catch (err) {
    console.log(err);
  }
}



export { past_item_sale_data_api };