import express from 'express'
import mongoose  from 'mongoose'
import cors from 'cors'
import bodyParser from "body-parser";
import bcrypt from "bcrypt";

import dotenv from "dotenv";
dotenv.config();

const MONGO_URL = process.env.MONGO_URL as string;

const app = express();

app.use(express.json());

app.use(cors());

mongoose.connect(MONGO_URL).then(() => {
    console.log("Successfully Connected to MongoDB");
});


app.get("/home", (req, res) => {
    res.status(200).json({
        msg: "Working"
    })
});


app.listen(3000, () => {
    console.log("Server Running at port 3000");
});