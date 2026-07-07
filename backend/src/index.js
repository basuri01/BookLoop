import dotenv from "dotenv"
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: './.env'
})

connectDB() //returns promises
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`The server is running on PORT ${process.env.PORT}`);
    })

    app.on("error", (error)=>{
        console.log("Error", error);
        throw error
    })
})
.catch((error)=>{
    console.log("MONDO DB connection failed", error);
})