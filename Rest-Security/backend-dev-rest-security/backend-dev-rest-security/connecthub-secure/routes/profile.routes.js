import express from "express";
import { updateProfile } from "../controllers/profile.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.put("/update", isAuth, updateProfile);

export default router;