import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  billNo: {
    type: String,
    required: true
  },
  party: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Party"
  },
  items: [
    {

    }
  ]
})

const Purchase = mongoose.model('Purchase', purchaseSchema);

export { Purchase }

