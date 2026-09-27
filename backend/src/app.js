import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

const app= express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from "./routes/user.router.js"
import bookRouter from "./routes/book.router.js"
import cartRouter from "./routes/cart.router.js";
import orderRouter from "./routes/order.router.js";
import wishlistRouter from "./routes/wishlist.routes.js";
import subscriberRouter from "./routes/subscriber.router.js";

//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/books", bookRouter)
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/newsletter", subscriberRouter);


export {app}