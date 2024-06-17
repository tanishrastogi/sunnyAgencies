import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
  party: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Party"
  },
  billNumber:{
    type:String,
    required:true
  },
  billDate:{
    type:String,
    required:true
  },
  salesMan:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"SalesMan"
  },
  partyPhoneNumber:{
    type:String
  },
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
      },
      discount:String,
      batchNumber:{
        type:String,
        required:true
      },
      quantity:String,
      free:String,
      deal:String,
      netSaleRate:String
    }
  ],
  searchTags:[String]
})

const Bill = new mongoose.model("Bill", billSchema);

export { Bill }