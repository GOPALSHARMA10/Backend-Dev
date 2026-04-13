import {StatusCodes} from "http-status-codes";

export function isAuth(req,res,next){
    if(!req.session.user){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            code:StatusCodes.UNAUTHORIZED,
            message:"Unauthorized",
            data:null
        });
    }
    next();
}
export function isAdmin(req,res,next){
    if(req.session.user?.role!=="admin"){
        return res.status(StatusCodes.FORBIDDEN).json({
            code:StatusCodes.FORBIDDEN,
            message:"Admin access required",
            data:null
        });
    }
    next();
}