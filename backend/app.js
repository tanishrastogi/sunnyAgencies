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
import saleRouter from "./src/routes/sale.routes.js";
import accountRouter from "./src/routes/account.routes.js";
import { ApiResponse } from "./src/utils/apiResponse.js";

const app = express();



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
app.use("/api/sale/", saleRouter);
app.use("/api/account/", accountRouter);

app.get("/api/health", (req, res) => {
  return res.json(new ApiResponse(200, null, "server started"))
})

console.log('01/04/2024'.split('/')[2])

export { app }