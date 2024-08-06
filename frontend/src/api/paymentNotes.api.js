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
    const {data} = await api.post("/payment-notes/fetch/date", payload);
    return data;
  }
  catch(err){
    console.log(err);
  }
}


const fetchAllNotes = async(payload)=>{
  try{
    const {data} = await api.post("/payment-notes/fetch/all");
    return data;
  }
  catch(err){
    console.log(err)
  }
}


export {
  createNote,
  fetchNoteByDate,
  fetchAllNotes
}