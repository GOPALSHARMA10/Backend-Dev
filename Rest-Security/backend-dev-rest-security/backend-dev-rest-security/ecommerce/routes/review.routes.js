import express from "express";
import {addReview, getReviews} from "../controllers/review.controller.js";
import {isAuth} from "../middleware/auth.middleware.js";

const router=express.Router();

router.post("/add",isAuth,addReview);
router.get("/get", getReviews);

export default router;