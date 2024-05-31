import mongoose from "mongoose";

const purchaseRateSchema = new mongoose.Schema({
  purchase:{

  },
  mrp: String,
  purchaseRate: String,
  batchNumber: String,
  quantity: String,
  deal: String,
  free: String,
  discount: String,
  purchase: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Purchase"
  },
})

const rateSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item', 
    unique:true
  },
  rates: {
    type:[purchaseRateSchema]
  }
})

rateSchema.post('save', async function(doc) {
  const totalQuantity = doc.rates.reduce((sum, rate) => sum + rate.quantity, 0);
  await mongoose.model('Item').findByIdAndUpdate(doc.item, { totalQuantity });
});


const Rate = mongoose.model('Rate', rateSchema);

rateSchema.index({ item: 1 }, { unique: true });


export { Rate }