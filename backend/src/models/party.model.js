import mongoose from "mongoose"

const partySchema = new mongoose.Schema({
  partyName:{
    type:String,
    required:true
  },
  address:{

  },
  mobile:{
    type:Number,
    unique:true
  },
  bills: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order"
  }],
  payments: [{
    type: String,
    unique: true
  }],
  purchases:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Purchase"
    }
  ],
  analytics:{

  }
},{
  timestamps:true
})

const Party = mongoose.model("Party", partySchema);

export { Party };

