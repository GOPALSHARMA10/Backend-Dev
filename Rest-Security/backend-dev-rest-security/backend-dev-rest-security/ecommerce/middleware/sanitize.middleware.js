import mongoSanitize from "express-mongo-sanitize";

export function sanitizeData(req,res,next){
    mongoSanitize.sanitize(req.body);
    mongoSanitize.sanitize(req.query);
    mongoSanitize.sanitize(req.params);
    next();
};


        