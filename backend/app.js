dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import itemWiseSaleRouter from "./src/routes/python.routes.js"
import graphRouter from "./src/routes/graphs.routes.js"
import dataRouter from "./src/routes/data.routes.js"
import rateRouter from "./src/routes/rate.routes.js"
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


const calculateTotalSalesInDecember2023 = async () => {
  try {
       // Define the start and end dates for December 2023
      //  const startDate = new Date("2024-04-01T00:00:00Z");
      //  const endDate = new Date("2024-04-30T23:59:59Z");
   
      //  // Ensure all bill amounts are properly converted to double
      //  await Bill.updateMany(
      //    { billDate: { $gte: startDate, $lte: endDate } },
      //    [{ $set: { totalAmount: { $toDouble: "$totalAmount" } } }]
      //  );
   
      //  // Aggregation pipeline to get total sales per day
      //  const result = await Bill.aggregate([
      //   // Filter bills within the specified date range
      //   {
      //     $match: {
      //       billDate: { $gte: startDate, $lte: endDate }
      //     }
      //   },
      //   // Add a field to represent the custom interval (1st, 15th, 30th of the month)
      //   {
      //     $addFields: {
      //       intervalStart: {
      //         $switch: {
      //           branches: [
      //             { case: { $lte: [{ $dayOfMonth: "$billDate" }, 15] }, then: { $dateFromParts: { year: { $year: "$billDate" }, month: { $month: "$billDate" }, day: 15 } } },
      //             { case: { $gt: [{ $dayOfMonth: "$billDate" }, 15] }, then: { $dateFromParts: { year: { $year: "$billDate" }, month: { $month: "$billDate" }, day: { $cond: [{ $lte: [{ $dayOfMonth: "$billDate" }, 30] }, 30, 1] } } } }
      //           ],
      //           default: "$billDate"
      //         }
      //       }
      //     }
      //   },
      //   // Group by the custom interval and sum the totalAmount
      //   {
      //     $group: {
      //       _id: "$intervalStart",
      //       totalSales: { $sum: "$totalAmount" },
      //       billNumbers: { $push: "$billNumber" }
      //     }
      //   },
      //   // Sort by the interval
      //   {
      //     $sort: { _id: 1 }
      //   },
      //   // Calculate cumulative sales
      //   {
      //     $group: {
      //       _id: null,
      //       data: {
      //         $push: {
      //           intervalStart: "$_id",
      //           totalSales: "$totalSales",
      //           billNumbers: "$billNumbers"
      //         }
      //       }
      //     }
      //   },
      //   {
      //     $unwind: "$data"
      //   },
      //   {
      //     $setWindowFields: {
      //       partitionBy: null,
      //       sortBy: { "data.intervalStart": 1 },
      //       output: {
      //         cumulativeSales: {
      //           $sum: "$data.totalSales",
      //           window: {
      //             documents: ["unbounded", "current"]
      //           }
      //         },
      //         cumulativeBills: {
      //           $push: "$data.billNumbers",
      //           window: {
      //             documents: ["unbounded", "current"]
      //           }
      //         }
      //       }
      //     }
      //   },
      //   // Project the final output
      //   {
      //     $project: {
      //       _id: 0,
      //       intervalStart: "$data.intervalStart",
      //       totalSales: "$data.totalSales",
      //       cumulativeSales: "$cumulativeSales",
      //       billNumbers: "$data.billNumbers",
      //       cumulativeBills: "$cumulativeBills"
      //     }
      //   }
      // ]);
  
      // // console.log(result);
  
      // // Calculate cumulative sales
      // let cumulativeSales = 0;
      // const cumulativeSalesData = result.map(({ date, totalSales, billNumbers }) => {
      //   cumulativeSales += totalSales;
      //   return {  cumulativeSales };
      // });
  
      // console.log("Cumulative Sales Data:", cumulativeSalesData);
      // return cumulativeSalesData;

      

  } catch (err) {
    console.error("Error calculating total sales in December 2023:", err);
    throw err;
  }
};

calculateTotalSalesInDecember2023();
// console.log(moment("01/04/2024", "DD/MM/YYYY").toDate().toString())
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