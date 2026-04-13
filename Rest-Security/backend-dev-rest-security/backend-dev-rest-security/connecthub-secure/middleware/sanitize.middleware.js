import { cleanHTML } from "../utils/sanitizer.js";

export function sanitizeData(req, res, next) {
    if (req.body) {
        for (let key in req.body) {
            if (typeof req.body[key] === "string") {
                req.body[key] = cleanHTML(req.body[key]);
            }
        }
    }
    next();
}