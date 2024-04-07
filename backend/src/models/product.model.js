import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
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
  gst: {
    type: Number
  },
  mrp: {
    type: String,
    required: true
  },
  saleRate: {
    type: Number
  },
  batchNumber: {
    type: Number,
    required: true
  }
})

const productSchema = new mongoose.Schema({
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
  packing: {
    type: String
  },
  gst: {
    type: String
  },
  mrp: {
    type: Number,
    required: trueqw
  },
  price: {
    type: priceSchema
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order"
    }
  ],
  item_sale_data:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"ItemSale"
  },
  reportID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reports"
  }
})

const Product = mongoose.model("Product", productSchema);



export { Product }