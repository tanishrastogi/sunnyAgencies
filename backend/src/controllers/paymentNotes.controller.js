import { handleErr } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { PaymentNotes } from "../models/paymentNotes.model.js";
import { Party } from "../models/party.model.js";

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



const fetchByID = async(req,res)=>{
  try{
    
    const {paymentNoteID} = req.body;

    const paymentNote = await PaymentNotes.findById() 

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



