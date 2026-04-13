import bcrypt from "bcrypt";
import User from "../models/User.js";

export function register(req, res) {
    const { username, email, password } = req.body;

    bcrypt.hash(password, 10)
    .then(hash => {
        const user = new User({ username, email, password: hash });
        return user.save();
    })
    .then(user => res.json({ message: "Registered", user }))
    .catch(() => res.status(500).json({ message: "Error" }));
}

export function login(req, res) {
    const { email, password } = req.body;

    User.findOne({ email })
    .then(user => {
        if (!user) return res.status(401).json({ message: "Invalid" });

        bcrypt.compare(password, user.password)
        .then(match => {
            if (!match) return res.status(401).json({ message: "Invalid" });

            req.session.userId = user._id;
            res.json({ message: "Login success" });
        });
    })
    .catch(() => res.status(500).json({ message: "Error" }));
}