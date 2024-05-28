import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
  purchaseRate: {
    type: Number,
    required: true
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

const itemSchema = new mongoose.Schema({
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
  totalQuantity:{
    type:Number,
    default:0
  },
  sale: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sale"
    }
  ],
  purchases: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Purchase"
  },
  item_sale_data: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ItemSale"
  },
  reportID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reports"
  },
  rates: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rate"
  }

})

const Item = mongoose.model("Product", itemSchema);



export { Item }