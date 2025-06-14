import mongoose from "mongoose";

const mrSchema = new mongoose.Schema({
  parties:[
    {
      partyID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Party"
      },
      bills:[
        {
          type:mongoose.Schema.Types.ObjectId,
          ref:"Bill"
        }
      ]
    }
  ],
  bills:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Bill"
    }
  ]
})