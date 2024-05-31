import mongoose from "mongoose";


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
  totalQuantity: {
    type: Number,
    default: 0
  },
  sale: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sale"
    }
  ],
  purchases: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Purchase"
    }
  ],
  item_sale_data: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ItemSale"
  },

  rates: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rate"
  },
  searchTags: [String]

})

itemSchema.index({ itemCode: 1 }, { unique: true });


const Item = mongoose.model("Item", itemSchema);



export { Item }