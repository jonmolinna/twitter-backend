import Post from '../models/Post.js';

export const addComment = async (req, res) => {
    const idPost = req.params.idPost;
    const { comment } = req.body;
    const { name, username } = req.userToken;

    try {
        await Post.findByIdAndUpdate(
            { "_id": idPost },
            {
                $push: {
                    comments: {
                        comment: comment,
                        username: username,
                        name: name,
                        createdAt: new Date().toISOString(),
                    }
                }
            }
        )
        
        return res.status(500).json({ message: 'Comentario se agrego' });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

export const deleteComment = async (req, res) => {
    const idPost = req.params.idPost;
    const idComment = req.params.idComment;

    try {
        await Post.findByIdAndUpdate(
            { "_id": idPost },
            {
                $pull: {
                    comments: {
                        "_id": { $in: idComment}
                    }
                }
            }
        )

        return res.status(500).json({ message: 'Delete comment' });

    } catch (err) {
        return res.status(500).json({ error: err });
    }
}

export const updateComment = async (req, res) => {
    const idPost = req.params.idPost;
    const idComment = req.params.idComment;
    const { comment } = req.body;

    try {
        await Post.findByIdAndUpdate(
            { "_id": idPost },
            {
                $set: {
                    'comments.$[comm].comment': comment
                },
            },
            {
                arrayFilters: [
                    { "comm._id": idComment },
                ]
            }
        );

        return res.status(500).json({ message: 'Update comment' });
        
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};


/*
$eq - equal - igual
$lt - low than - menor que
$lte - low than equal - menor o igual que
$gt - greater than - mayor que
$gte - greater than equal - mayor o igual que
$ne - not equal - distinto
$in - in - dentro de
$nin - not in - no dentro de
*/