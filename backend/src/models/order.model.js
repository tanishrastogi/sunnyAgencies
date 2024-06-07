import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  party:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Party"
  },
  items:[
    {
      item:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Item"
      },
      discount:String,
      deal:String,
      quantity:String,
      rate:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Rate"
      }
    }
  ]
},{
  timestamps:true
})

const Order = mongoose.model("Order", orderSchema);

export {Order};