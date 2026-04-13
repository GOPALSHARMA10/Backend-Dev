import express from "express";
import {login, register} from "../controllers/auth.controller.js";
import { limitRequests } from "../middleware/rateLimit.middleware.js";

const router=express.Router();

router.post("/register",register);
router.post("/login",limitRequests,login);

export default router;