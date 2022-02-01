import cloudinary from 'cloudinary';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY } from '../config.js'

cloudinary.v2.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_secret: CLOUDINARY_API_SECRET,
    api_key: Number(CLOUDINARY_API_KEY),
});

export default cloudinary;