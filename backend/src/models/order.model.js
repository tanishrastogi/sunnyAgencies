import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  
})

const Order = new mongoose.model("Order", orderSchema);

export { Order }