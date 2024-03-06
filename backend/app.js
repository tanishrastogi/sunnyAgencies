dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import itemWiseSaleRouter from "./src/routes/python.routes.js"
import graphRouter from "./src/routes/graphs.routes.js"
import dataRouter from "./src/routes/data.routes.js"
import rateRouter from "./src/routes/rate.routes.js"

const app = express();

// middlewares
app.use(
    cors({
        origin: "*",
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        exposedHeaders: ["set-cookie"],
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/graphs", graphRouter)
app.use("/api/sales/item", itemWiseSaleRouter)
app.use("/api/sales/", dataRouter)
app.use("/api/sale-rate/", rateRouter)

app.get("/test" , (req,res)=>{
    res.send("hello world!")
})

export { app }