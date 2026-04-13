import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import libraryRoutes from "./routes/library.routes.js";
import globalErrorHandler from "./middleware/rateLimit.middleware.js";

const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret:"library_secret",
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:60*60*1000,httpOnly:true}
}));
app.use("/api",libraryRoutes);
app.use(globalErrorHandler);

mongoose.connect("mongodb://localhost:27017/library")
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((error)=>{
    console.error("MongoDB connection error:",error);
});

const PORT=8088;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});