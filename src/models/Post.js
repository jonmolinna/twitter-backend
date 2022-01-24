import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    username: String,
    message: {
        type: String,
        trim: true,
    },
    imagen: {
        url: String,
        cloudinary_id: String,
    },
    likes: [
        {
            username: String,
            createdAt: String,
        },
    ],
    comments: [
        {
            comment: String,
            username: String,
            createdAt: String,
        }
    ]
}, { timestamps: true, versionKey: false });

export default mongoose.model('Post', postSchema);