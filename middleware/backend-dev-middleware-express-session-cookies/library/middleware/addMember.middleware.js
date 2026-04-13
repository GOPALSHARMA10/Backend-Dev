import joi from "joi";
import {StatusCodes} from "http-status-codes";

export function addMember(req,res,next){
    const schema=joi.object({
        memberId:joi.number().required(),
        name:joi.string().required().min(3).max(100),
        membershipType:joi.string().required().valid("Normal","Gold")
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