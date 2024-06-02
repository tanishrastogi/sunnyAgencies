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
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
      },
      discount:String,

    }
  ],
  searchTags:[String]
})

const Bill = new mongoose.model("Bill", billSchema);

export { Bill }