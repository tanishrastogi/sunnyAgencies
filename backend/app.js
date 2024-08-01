dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import itemWiseSaleRouter from "./src/routes/python.routes.js"
import graphRouter from "./src/routes/graphs.routes.js"
import dataRouter from "./src/routes/data.routes.js"
import rateRouter from "./src/routes/item.routes.js"
import adderRouter from "./src/routes/adder.routes.js"
import searchRouter from "./src/routes/search.routes.js"
import purchaseRouter from "./src/routes/purchase.routes.js"
import paymentNotesRouter from "./src/routes/paymentNotes.routes.js"
import pdfRouter from "./src/routes/pdf.routes.js";
import collectionRouter from "./src/routes/collection.routes.js";
import { Bill } from "./src/models/bill.model.js";
import mongoose from "mongoose";
import { ApiResponse } from "./src/utils/apiResponse.js";

const app = express();


const getItemsWithDiscounts = async () => {
  try {

    const itemId = '666e935b99f987da2e959a2b'

    const result = await Bill.aggregate([
      // Match bills containing the specific item ID
      { $match: { 'items.item':new mongoose.Types.ObjectId(itemId) } },
      
      // Unwind the items array
      { $unwind: '$items' },
      
      // Match again to ensure we only get the specific item
      { $match: { 'items.item': new mongoose.Types.ObjectId(itemId) } },
      
      // Lookup to join the items with their details
      {
        $lookup: {
          from: 'items', // The collection name for items
          localField: 'items.item',
          foreignField: '_id',
          as: 'itemDetails'
        }
      },
      
      // Unwind the itemDetails array to get the actual item details
      { $unwind: '$itemDetails' },
      
      // Project the desired fields and convert discount to double
      {
        $project: {
          billNumber: 1,
          'items.discount':1,
          'items.quantity': 1,
          'items.free': 1,
          'items.deal': 1,
          'items.netSaleRate': 1,
          'items.batchNumber': 1
        }
      }
    ]);
    
    
    console.log(result);
    return result;
  } catch (err) {
    console.error('Error fetching items with discounts:', err);
    throw err;
  }
};

// Call the function
getItemsWithDiscounts();
// middlewares
app.use(
  cors({
    origin: ["http://localhost:3000", "https://sunny-agencies.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    exposedHeaders: ["set-cookie"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/graphs", graphRouter);
app.use("/api/sales/item", itemWiseSaleRouter);
app.use("/api/sales/", dataRouter);
// app.use("/api/sale-rate/", saleRateRouter);
app.use("/api/adder/", adderRouter);
app.use("/api/search/", searchRouter);
app.use("/api/purchase/", purchaseRouter);
app.use("/api/rates/", rateRouter);
app.use("/api/payment-notes/", paymentNotesRouter);
app.use("/api/pdf/", pdfRouter);
app.use("/api/collection/", collectionRouter);

app.get("/api/health", (req, res) => {
  return res.json(new ApiResponse(200, null, "server started"))
})

// console.log(`${31%3}+1`)

export { app }