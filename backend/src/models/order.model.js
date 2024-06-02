import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Item"
    }
  ]
})