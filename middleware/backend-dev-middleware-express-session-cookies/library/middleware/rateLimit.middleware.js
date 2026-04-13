import rateLimit,{ipKeyGenerator} from "express-rate-limit";
import {StatusCodes} from "http-status-codes";

const globalLimiter=rateLimit({
    windowMs:15*60*1000,
    limit:100,
    standardHeaders:true,
    legacyHeaders:false,
    handler:(req,res)=>{
        res.status(StatusCodes.TOO_MANY_REQUESTS).json({
            code:StatusCodes.TOO_MANY_REQUESTS,
            message:"Too many requests, please try again later",
            data:null
        });
    }
});

export default globalLimiter;

export const userLimiter=rateLimit({
    windowMs:15*60*1000,
    limit:50,
    standardHeaders:true,
    legacyHeaders:false,
    keyGenerator:(req,res)=>{
        if(req.session?.user?.username){
            return req.session.user.username;
        }
        if(req.cookies?.borrowCart){
            return req.cookies.borrowCart;
        }
        return ipKeyGenerator(req);
    },
    handler:(req,res)=>{
        res.status(StatusCodes.TOO_MANY_REQUESTS).json({
            code:StatusCodes.TOO_MANY_REQUESTS,
            message:"Too many requests, please try again later",
            data:null
        });
    }
});
