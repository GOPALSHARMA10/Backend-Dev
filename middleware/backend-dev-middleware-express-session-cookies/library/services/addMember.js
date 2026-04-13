import Member from "../model/member.model.js";
import {StatusCodes} from "http-status-codes";

export function addmember(req,res){
    const member=new Member(req.body);
    member.save()
    .then(data=>{
        res.status(StatusCodes.CREATED).json({
            code:StatusCodes.CREATED,
            message:"Member added",
            data:member
        });
    })
    .catch(err=>{
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR,
            message:StatusCodes.INTERNAL_SERVER_ERROR,
            data:null
        });
    }); 
}