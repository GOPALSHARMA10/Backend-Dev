import express from "express";
import {addProduct, searchProducts} from "../controllers/product.controller.js";
import {isAuth, isAdmin} from "../middleware/auth.middleware.js";

const router=express.Router();

router.post("/add",isAuth,isAdmin,addProduct);
router.get("/search",searchProducts);

export default router;