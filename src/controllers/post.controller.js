import Post from '../models/Post.js';
import cloudinary from '../util/cloudinary.js';

// Create a Post
export const createPost = async (req, res) => {
    let message = req.body.message;
    let image = req.file?.path;
    const { id } = req.userToken;
    
    try {

        // Validaciones
        if (!(message || image)) {
            return res.status(400).json({ message: 'Ingrese un mensaje o imagen' });
        };

        if (message.length >= 200) {
            return res.status(400).json({ message: 'Ingrese un mensaje no mayor a 200 caracteres'})
        }

        let result;
        if (image) {
            result = await cloudinary.uploader.upload(image);
        };

        await Post.create({
            user: id,
            message: message,
            imagen: {
                url: result? result.secure_url : null,
                cloudinary_id: result? result.public_id : null,
            },
        });

        return res.status(200).json({ msg: 'Se creo un tweet' });
        
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

// Get All Posts
export const getAllPost = async (req, res) => {
    try {
        const posts = await Post
        .find()
        .sort({createdAt: -1})
        .populate('user', '-password -createdAt -updatedAt')

        return res.status(200).json({ posts })
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

// Get One Post
export const getOnePost = async (req, res) => {
    const idPost = req.params.idPost;
    try {
        const post = await Post.findById(idPost).populate('user', '-password -createdAt -updatedAt');

        if (post.comments.length > 0 ){
            post.comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

            return res.status(200).json({ post })
        } else  {
            return res.status(200).json({ post })
        }

    } catch (err) {
        res.status(500).json({ error: err });
    }
};

// Delete Post
export const deletePost = async (req, res) => {
    const idPost = req.params.idPost;

    try {
        let post = await Post.findById(idPost);

        let img = post.imagen.cloudinary_id;

        if (img) {
            await cloudinary.uploader.destroy(img);
        }

        await post.remove();
 
        return res.status(200).json({ message: 'Delete Post' })
    } catch (err) {
        res.status(500).json({ error: err });
    }
}