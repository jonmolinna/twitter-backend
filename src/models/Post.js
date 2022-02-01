import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
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
            name: String,
            createdAt: String,
            likes: [
                {
                    username: String,
                    createdAt: String,
                }
            ]
        }
    ]
}, { timestamps: true, versionKey: false });

export default mongoose.model('posts', postSchema);