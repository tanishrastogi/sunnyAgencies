import mongoose from "mongoose";

const paymentNotesModelSchema = new mongoose.Schema({
  billNumber:String,
  billDate:String,
  party:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Party"
  },
  narration:String,
},
{
  timestamps:true
});



export const PaymentNotes = mongoose.model("PaymentNote", paymentNotesModelSchema);

