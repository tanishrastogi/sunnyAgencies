import express from "express";
import connectDB from "./src/db/conn.js";
import dotenv from "dotenv";
import { app } from "./app.js";
import { sale_cumulative_line_chart } from "./src/controllers/analytics/graphs.controllers.js";

dotenv.config();
const PORT = process.env.PORT;


connectDB().then(()=>{
    app.listen(PORT || 8005 , ()=>{
        console.log(`server is running on port ${PORT}`);
    })
})

