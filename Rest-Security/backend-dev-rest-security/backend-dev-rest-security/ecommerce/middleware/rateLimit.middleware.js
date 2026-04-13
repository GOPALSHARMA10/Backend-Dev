import rateLimit from "express-rate-limit"; 
import {StatusCodes} from "http-status-codes";

export const limitRequests=rateLimit({
    windowMs:15*60*1000,
    max:100, 
    message:{
        code:StatusCodes.TOO_MANY_REQUESTS,
        message:"Too many login attempts. Please try again after 15 minutes."
    }
});
