import validator from "validator";

export function validateRegister(req, res, next) {
    const { email } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid Email" });
    }

    next();
}