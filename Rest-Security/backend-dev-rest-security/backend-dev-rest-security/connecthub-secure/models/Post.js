import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: String
}, { timestamps: true });

export default mongoose.model("Post", postSchema);