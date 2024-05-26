import mongoose from "mongoose";

const purchaseRateSchema = new mongoose.Schema({
  purchase:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Purchase"
  },
  mrp:String,
  purchaseRate:String, 
  batchNumber:String,
  quantity:Number,
  deal:String,
  discount:String
})

const rateSchema = new mongoose.Schema({
  item:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Item'
  },
  rates:[purchaseRateSchema]
})

const Rate = mongoose.model('Rate', rateSchema);