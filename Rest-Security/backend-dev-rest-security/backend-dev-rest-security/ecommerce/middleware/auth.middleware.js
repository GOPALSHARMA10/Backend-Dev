import {StatusCodes} from 'http-status-codes';

export function isAuth(req,res,next){
    try{
        if(!req.session || !req.session.userId){
            return res.status(StatusCodes.UNAUTHORIZED).json({
                code:StatusCodes.UNAUTHORIZED,
                message:"Unauthorized"
            });
        }
        next();
    }catch(error){
        console.error("Authentication error:",error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR,
            message:"Internal Server Error"
        });
    }
}

export function isAdmin(req,res,next){
    try{
        if(req.session.role!=="admin"){
            return res.status(StatusCodes.FORBIDDEN).json({
                code:StatusCodes.FORBIDDEN,
                message:"Forbidden"
            });
        }
        next();
    }catch(error){
        console.error("Authorization error:",error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR,
            message:"Internal Server Error",
            data:null
        });
    }
};