import { api } from "./api";

const createNote = async(payload)=>{
  try{
    const {data} = await api.post("/payment-notes/create", payload);
    return data
  }
  catch(err){
    console.log(err);
  }
}


const fetchNoteByDate = async(payload)=>{
  try{
    const {data} = await api.post("/payment-note/fetch/date", payload)
  }
  catch(err){
    console.log(err);
  }
}


export {
  createNote
}