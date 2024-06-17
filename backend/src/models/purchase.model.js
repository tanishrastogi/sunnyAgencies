import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  billNo: {
    type: String,
    required: true
  },
  billDate:{
    type:String
  },
  invoiceNo:{
    type:String,
    required:true
  },
  party: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Party"
  },
  partyCode:{   // party code is stored because it will be needed while adding the purchase to the db 
    type:String
  },
  items: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Item'
    }
  ],
  purchaseAmount:{
    type:Number
  },
  expense:{
    type:Number
  },
  searchTags:[String]
})

const Purchase = mongoose.model('Purchase', purchaseSchema);

export { Purchase }

