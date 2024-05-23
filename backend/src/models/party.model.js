import mongoose from "mongoose"

const partySchema = new mongoose.Schema({
  partyName: {
    type: String,
    required: true
  },
  partyCode: {
    type: String,
    required: true
  },
  address: String,
  details: {
    dlNo1: String,
    dlNo2: String,
    gstNumber: String,
    accountGroup: String,
    mobile: [Number]
  },
  bills: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order"
  }],
  payments: [{
    type: String,
    unique: true
  }],
  purchases: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Purchase"
    }
  ],
  analytics: {

  }
}, {
  timestamps: true
})

const Party = mongoose.model("Party", partySchema);

export { Party };

