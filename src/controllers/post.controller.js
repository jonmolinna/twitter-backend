import Post from '../models/Post.js';
import User from '../models/User.js';
import cloudinary from '../util/cloudinary.js';

// Create a Post
export const createPost = async (req, res) => {
    let message = req.body.message;
    let image = req.file?.path;
    const { username } = req.userToken;
    
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
            username: username,
            message: message,
            imagen: {
                url: result? result.secure_url : null,
                cloudinary_id: result? result.public_id : null,
            },
        });

        return res.status(500).json({ msg: 'Se creo un tweet' });
        
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

// Get All Posts
export const getAllPost = async (req, res) => {
    const { username } = req.userToken;

    try {
        const posts = await Post.find();
        const user = await User.findOne(
            { username: username },
            { password: 0, createdAt: 0, updatedAt: 0 }
        )

        return res.status(200).json({ posts })
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};