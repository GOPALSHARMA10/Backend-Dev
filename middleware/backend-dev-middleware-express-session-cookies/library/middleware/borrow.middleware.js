import joi from "joi";
import {StatusCodes} from "http-status-codes";

export function borrowBook(req,res,next){
    const schema=joi.object({
        memberId:joi.number().required(),
        bookIds:joi.array().items(joi.number()).required()
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