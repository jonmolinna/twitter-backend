import Post from '../models/Post.js';

export const likePost = async (req, res) => {
    const { username } = req.userToken;
    const idPost = req.params.idPost;

    try {
        const post = await Post.findById(idPost);

        if (post) {
            if (post.likes.find(like => like.username === username)) {
                // In Like
                post.likes = post.likes.filter(like => like.username !== username);
            } else {
                // Like
                post.likes.push({
                    username,
                    createdAt: new Date().toISOString(),
                })
            }
        };

        await post.save();

        return res.status(200).json({ post: 'Like' });
        
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const LikeCommentPost = async (req, res) => {
    const { username } = req.userToken;
    const idPost = req.params.idPost;
    const idComment = req.params.idComment;

    try {
        const post = await Post.findById(idPost);
        const comment = post.comments.find(comment => comment._id.toString() === idComment);

        if (comment) {
            if (comment.likes.find(like => like.username === username)) {
                // Un Like
                comment.likes = comment.likes.filter(like => like.username !== username);
            } else {
                // Like
                comment.likes.push({
                    username,
                    createdAt: new Date().toISOString()
                })
            }
        }

        await post.save();

        return res.status(200).json({ message: 'Like Comment' });
        
    } catch (err) {
        res.status(500).json({ error: err });
    }
};