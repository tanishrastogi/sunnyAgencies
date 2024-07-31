import mongoose from "mongoose";

const purchaseRateSchema = new mongoose.Schema({
  mrp: String,
  purchaseRate: String,
  partyPurchaseRate: String,
  batchNumber: String,
  quantity: String,
  deal: String,
  free: String,
  discount: String,
  expiryDate: String,
  purchase: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Purchase"
  },
  partyID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Party"
  }
});



const rateSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    unique: true
  },
  itemCode: {
    type: String
  },
  rates: {
    type: [purchaseRateSchema]
  }
})

const Rate = mongoose.model('Rate', rateSchema);



rateSchema.index({ item: 1 }, { unique: true });


export { Rate }