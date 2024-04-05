import mongoose from "mongoose";

const priceSchema = mongoose.Schema({
  purchaseRate: {
    type: Number,
    required: True
  },
  deal: {
    type: Number
  },
  discount: {
    type: Number
  }, 
  gst:{
    type:Number
  },
  mrp:{
    type:String, 
    required:true
  }, 
  saleRate:{
    type:Number
  }
})

const productSchema = mongoose.Schema({
  itemCode: {
    type: String,
    required: true,
    unique: true
  },
  itemName: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    default: "misc"
  },
  gst: {
    type: String
  },
  mrp:{
    type:Number, 
    required:trueqw
  },
  price:{
    type:priceSchema
  }, 
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order"
    }
  ]
})

const Product = new mongoose.model(productSchema);