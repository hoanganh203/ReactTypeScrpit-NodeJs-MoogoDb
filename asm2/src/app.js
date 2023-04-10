import express from 'express';
import productRouter from "./routers/product";
import mongoose from 'mongoose';
import categoryRouter from "./routers/category";

import userRouter from "./routers/auth";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", userRouter);

mongoose.connect("mongodb://127.0.0.1:27017/Asm");

export const viteNodeApp = app;