import joi from "joi";
import {StatusCodes} from "http-status-codes";

export function addBook(req,res,next){
    const schema=joi.object({
        bookId:joi.number().required(),
        title:joi.string().required().min(3).max(100),
        author:joi.string().required().min(3).max(100),
        price:joi.number().required().positive()
    });
    let {error,value}=schema.validate(req.body);
    if(error){
        return res.status(StatusCodes.BAD_REQUEST).json({
            code:StatusCodes.BAD_REQUEST,
            message:StatusCodes.BAD_REQUEST,
            data:null
        });
    }
    req.body=value;
    next();
}