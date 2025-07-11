import mongoose, { mongo } from "mongoose"

const partySchema = new mongoose.Schema({
  partyName: {
    type: String,
    required: true
  },
  partyCode: {
    type: String,
    required: true,
    // unique:true
  },
  address: [String],
  details: {
    dlNo1: String,
    dlNo2: String,
    gstNumber: String,
    accountGroup: String,
    mobile: [String]
  },
  bills: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bill"
  }],
  purchases:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Purchase"
    }
  ],
  collections:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Collection"
    }
  ],
  paymentNotes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"PaymentNotes"
  }],
  searchTags:[String],
  analytics: {

  }
}, {
  timestamps: true
})

const Party = mongoose.model("Party", partySchema);

export { Party };

