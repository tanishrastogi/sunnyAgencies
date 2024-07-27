import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
  party: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Party"
  },
  partyCode:String,
  billNumber: {
    type: String,
    required: true
  },
  billDate: {
    type: Date,
    required: true
  },
  paymentMethod:{
    type:String,
    enum:['Cash', 'Credit']
  },
  salesMan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SalesMan"
  },
  totalAmount:{
    type:String
  },
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
      },
      itemCode:String,
      discount: String,
      batchNumber: {
        type: String,
        required: true
      },
      quantity: String,
      free: String,
      deal: String,
      netSaleRate: String
    }
  ],
  searchTags: [String]
});

const Bill = mongoose.model("Bill", billSchema);

export { Bill };