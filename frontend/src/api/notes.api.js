import { api } from "./api";


const create_payment_note = async (payload) => {
  try {

    const { data } = await api.post(`/payment-note/create`, { payload });
    
    // console.log(data)
    return data
  }
  catch (err) {
    console.log(err);
  }
}


export { 
  create_payment_note 
}