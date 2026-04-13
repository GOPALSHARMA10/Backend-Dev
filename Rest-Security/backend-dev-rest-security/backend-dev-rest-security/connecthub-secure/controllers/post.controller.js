import Post from "../models/Post.js";

export function createPost(req, res) {
    const post = new Post({
        userId: req.session.userId,
        content: req.body.content
    });

    post.save()
    .then(data => res.json(data))
    .catch(() => res.status(500).json({ message: "Error" }));
}

export function getPosts(req, res) {
    Post.find()
    .then(posts => res.json(posts))
    .catch(() => res.status(500).json({ message: "Error" }));
}