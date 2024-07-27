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
import moment from "moment";
import { ist_to_utc } from "./src/utils/date_functions.js";

// import displayRouter from "./src/routes/display.routes.js"

const app = express();


const calculateTotalSalesInDecember2023 = async () => {
  try {
    // Start and end dates for December 2023

    const startDate = new Date(ist_to_utc("2024-06-03T00:00:00.000Z"));
    const endDate = new Date(ist_to_utc("2024-06-03T23:59:59.999Z"));

    // Ensure all bill amounts are properly converted to double
    await Bill.updateMany(
      { billDate: { $gte: startDate, $lte: endDate } },
      [{ $set: { totalAmount: { $toDouble: "$totalAmount" } } }]
    );

    const result = await Bill.aggregate([
      {
        $match: {
          billDate: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: null, // Group all documents into a single group
          totalSales: { $sum: { $toDouble: "$totalAmount" } } // Sum the totalAmount field
        }
      }
    ]);

    // const countPipeline = [
    //   {
    //     $match: {
    //       billDate: { $gte: startDate, $lte: endDate }
    //     }
    //   },
    //   {
    //     $group: {
    //       _id: null, // Group all documents into a single group
    //       totalSales: { $sum: "$totalAmount" }, // Sum the totalAmount field
    //       billNumbers: { $push: "$billNumber" }, // Collect all bill numbers
    //       count: { $sum: 1 } // Count the number of bills
    //     }
    //   }
    // ];

    // const count = await Bill.aggregate(countPipeline)


    console.log(result);
    // console.log(count[0].billNumbers[count[0].billNumbers.length-1])

    console.log("Total Sales in December 2023:", result[0]?.totalSales || 0);
    return result[0]?.totalSales || 0;
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
    origin: ["http://localhost:3000", "http://192.168.1.13:3000"],
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

app.get("/test", (req, res) => {
  res.send("hello world!")
})

// console.log(`${31%3}+1`)

export { app }