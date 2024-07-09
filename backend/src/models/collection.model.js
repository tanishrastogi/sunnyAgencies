import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
  entryDate:{
    type:Date,
    required:true
  },
  entryNumber:{
    type:String,
    required:true
  },
  party:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Party"
  },
  partyCode:{
    type:String,
    required:true
  },
  paymentType:{
    type:String,
    enum:["cash", "bank"]
  },
  chequeNumber:{
    type:String,
  },
  narration:String

});

export const Collection = mongoose.model("Collection", collectionSchema); 