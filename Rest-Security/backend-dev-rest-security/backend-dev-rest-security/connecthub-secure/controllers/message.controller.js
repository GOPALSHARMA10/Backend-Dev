import Message from "../models/Message.js";

export function sendMessage(req, res) {
    const msg = new Message({
        senderId: req.session.userId,
        receiverId: req.body.receiverId,
        text: req.body.text
    });

    msg.save()
    .then(() => res.json({ message: "Sent" }))
    .catch(() => res.status(500).json({ message: "Error" }));
}

export function getMessages(req, res) {
    const userId = req.session.userId;

    Message.find({
        $or: [
            { senderId: userId },
            { receiverId: userId }
        ]
    })
    .then(msgs => res.json(msgs))
    .catch(() => res.status(500).json({ message: "Error" }));
}