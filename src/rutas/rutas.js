import express from "express";
const router = express.Router();

import { createUser, login } from '../controllers/user.controller.js';
import { createPost, getAllPost } from '../controllers/post.controller.js';
import { verifyToken } from '../util/token.js';
import uploadMulter from '../util/uploadMulter.js';
import validImg from '../util/validator.img.js';

// Users
router.post('/addUser', createUser);
router.post('/auth', login);

// Post
router.post('/addPost', [verifyToken, uploadMulter, validImg], createPost);
router.get('/getAllPosts', verifyToken, getAllPost);

export default router;