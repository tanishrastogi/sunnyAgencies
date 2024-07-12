import { handleErr } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { PaymentNotes } from "../models/paymentNotes.model.js";
import { Party } from "../models/party.model.js";
import { ist_to_utc } from "../utils/ISTtoUTC.js";

export const createNote = async (req, res) => {
  try {

    const { billNumber, billDate, partyID, narration } = req.body;
    const party = await Party.findById(partyID);

    if (!party) return res.json(new ApiResponse(404, "Party not found"));

    const PaymentNote = new PaymentNotes({
      billNumber,
      billDate,
      party: partyID,
      narration
    })

    await PaymentNote.save();

    await Party.findByIdAndUpdate(partyID, {$push:{paymentNotes:PaymentNote._id}});

    return res.json(new ApiResponse(200, PaymentNote, "Payment note created"));

  }
  catch (err) {
    return handleErr(res, err);
  }
}



export const fetchByID = async(req,res)=>{
  try{
    
    const {paymentNoteID} = req.body;

    const paymentNote = await PaymentNotes.findById(paymentNoteID);
    
    if(!paymentNote) return res.json(new ApiResponse(404, "Note not found!"));

    return res.json(new ApiResponse(200, paymentNote, "note fetched successfully."));

  }
  catch(err){
    return handleErr(res,err);
  }

}



export const fetchAll = async(req,res)=>{
  try{
    
    const paymentNotes = await PaymentNotes.find({})
    
    if(!paymentNotes) return res.json(new ApiResponse(404, "no notes found"));

    return res.json(new ApiResponse(200, paymentNotes, "Payment notes fetched successfully"));

  }
  catch(err){
    return handleErr(res,err);
  }
}



export const fetchByDate = async(req,res)=>{
  try{
    
    const {date} = req.body;

    console.log("78",date)

    const utcDate = ist_to_utc(date);

    const start = new Date(utcDate.setUTCHours(0,0,0,0))
    const end = new Date(utcDate.setUTCHours(23,59,59,999))

    const notes = await PaymentNotes.find({createdAt:{
      $gte:start,
      $lt:end
    }}).populate("party");


    console.log(notes)
    if(!notes || notes.length===0) return res.json(new ApiResponse(404, notes,"no notes found for this date."));
    
    return res.json(new ApiResponse(200, notes, "notes for this date fetched successfully."));

  }
  catch(err){
    return handleErr(res,err);
  }
}


export const fetchByAccount = async(req,res)=>{
  try{
    
    const {accountID} = req.body;

    const paymentNotes = await PaymentNotes.find({party:accountID});
    
    if(!paymentNotes) return res.json(new ApiResponse(404, "No notes found in this account."));

    return res.json(new ApiResponse(200, paymentNotes, "fetched successfully"));

  }
  catch(err){
    return handleErr(res,err);
  }
}


export const deleteNoteByID = async (req, res) => {
  try {
    const { noteID } = req.body;
    
    if (!noteID) return res.json(new ApiResponse(404, "Provide All the details"));
    
    const deletedNote = await PaymentNotes.findByIdAndDelete(noteID);
    
    if(!deletedNote) return res.json(new ApiResponse(409, "error deleting this note"));
    
    return res.json(new ApiResponse(200, deletedNote, "note deleted successfully"));
  }
  catch (err) {
    return handleErr(res, err);
  }
}



export const deleteNoteByDate = async(req,res) => {
  try {
    
    const {date} = req.body;
    
    if(!date) return res.json(new ApiResponse(404, "Provide all the details"));

    const paymentNotes = await PaymentNotes.deleteMany({createdAt:date});

    if(!paymentNotes) return res.json(new ApiResponse(422, "Unable to delete notes for this date."));

    return res.json(new ApiResponse(200, paymentNotes, "Deleted successfully"));


  }
  catch (err) {
    return handleErr(res, err);
  }
}



export const deleteNoteByPartyID = async(req,res) => {
  try {
    
    const {partyID} = req.body;
    
    if(!partyID) return res.json(new ApiResponse(404, "Provide all the details"));
    
    const deletedNotes = await PaymentNotes.deleteMany({party:partyID});

    await Party.findByIdAndUpdate(partyID, {$set:{paymentNotes:[]}});
    
    if(!deletedNotes) return res.json(new ApiResponse(422, "Unable to delete notes of this party"));
    
    return res.json(new ApiResponse(200, deletedNotes, "Notes deleted successfully."));
  
  }
  catch (err) {
    return handleErr(res, err);
  }
}



export const deleteAll =async (req,res) => {
  try {
    await PaymentNotes.deleteMany({});
    return res.json(new ApiResponse(200, "All the notes has been successfully deleted from the database"));
  }
  catch (err) {
    return handleErr(res, err);
  }
}



