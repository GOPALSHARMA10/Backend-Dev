import express from "express";
import {login} from "../services/auth.js";
import {addbook} from "../services/addBook.js";
import {addmember} from "../services/addMember.js";
import {addToCart, viewCart} from "../services/cart.js";
import {borrow} from "../services/borrow.js";
import {summary} from "../services/summary.js";
import {fine} from "../services/fine.js";
import {isAuth, isAdmin} from "../middleware/auth.middleware.js";
import {addBook} from "../middleware/addBook.middleware.js";
import {addMember} from "../middleware/addMember.middleware.js";
import {borrowBook} from "../middleware/borrow.middleware.js";

const router=express.Router();

router.post("/login",login);
router.post("/books",isAuth,isAdmin,addBook,addbook);
router.post("/members",isAuth,isAdmin,addMember,addmember);
router.post("/cart",isAuth,addToCart);
router.get("/cart",isAuth,viewCart);
router.post("/borrow",isAuth,borrowBook,borrow);
router.get("/summary",isAuth,isAdmin,summary);
router.get("/fine",isAuth,isAdmin,fine);

export default router;