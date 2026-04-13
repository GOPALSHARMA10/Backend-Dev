import express from "express";
import { createPost, getPosts } from "../controllers/post.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", isAuth, createPost);
router.get("/", getPosts);

export default router;