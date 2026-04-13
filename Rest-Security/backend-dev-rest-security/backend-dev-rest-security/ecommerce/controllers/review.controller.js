import validator from "validator";
import Review from "../models/Review.js";
import Product from "../models/Product.js";
import {StatusCodes} from "http-status-codes";

function cleanInput(input){
    return input
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
export function addReview(req,res){
    try{
        const { productId, comment } = req.body;

        if(!productId || !comment){
            return res.status(StatusCodes.BAD_REQUEST).json({
                code: StatusCodes.BAD_REQUEST,
                message: "ProductId and comment required"
            });
        }

        // 🔐 Clean comment (XSS protection)
        const safeComment = cleanInput(comment);

        const newReview = new Review({
            productId,
            userId: req.session.userId,
            comment: safeComment
        });

        newReview.save()
        .then(review=>{
            res.status(StatusCodes.CREATED).json({
                code: StatusCodes.CREATED,
                message: "Review added successfully",
                data: review
            });
        })
        .catch(err=>{
            console.error("Review error:", err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: "Internal Server Error"
            });
        });

    }catch(err){
        console.error("Review error:", err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error"
        });
    }
}

export function getReviews(req,res){
    try{
        const { productId } = req.query;

        if(!productId){
            return res.status(StatusCodes.BAD_REQUEST).json({
                code: StatusCodes.BAD_REQUEST,
                message: "ProductId required"
            });
        }

        Review.find({ productId })
        .then(reviews=>{
            res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                message: "Reviews fetched",
                data: reviews
            });
        })
        .catch(err=>{
            console.error("Fetch error:", err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: "Internal Server Error"
            });
        });

    }catch(err){
        console.error("Fetch error:", err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error"
        });
    }
}