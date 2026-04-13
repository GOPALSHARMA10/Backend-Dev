import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/send", isAuth, sendMessage);
router.get("/", isAuth, getMessages);

export default router;