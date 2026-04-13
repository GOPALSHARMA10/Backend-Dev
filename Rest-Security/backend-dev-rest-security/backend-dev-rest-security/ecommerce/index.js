import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import helmet from "helmet";
import MongoStore from "connect-mongo";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import {sanitizeData} from "./middleware/sanitize.middleware.js";
import { limitRequests } from "./middleware/rateLimit.middleware.js";
dotenv.config();
connectDB();

const app=express();

app.use(helmet());
app.use(cors({
    origin:true,
    credentials:true
}));
app.use(limitRequests);
app.use(express.json());
app.use(sanitizeData);

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({mongoUrl:process.env.MONGO_URI}),
    cookie:{maxAge:60*60*1000}
}));

app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/reviews",reviewRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});