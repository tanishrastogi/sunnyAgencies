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
  mrp:{
    type:String, 
    required:true
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