import User from "../models/User.js";

export function updateProfile(req, res) {
    User.findByIdAndUpdate(
        req.session.userId,
        {
            bio: req.body.bio,
            profilePic: req.body.profilePic
        },
        { new: true }
    )
    .then(user => res.json(user))
    .catch(() => res.status(500).json({ message: "Error" }));
}