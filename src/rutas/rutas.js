import express from "express";
const router = express.Router();

import { createUser, login } from '../controllers/user.controller.js';
import { createPost, getAllPost, getOnePost, deletePost } from '../controllers/post.controller.js';
import { addComment, deleteComment, updateComment } from '../controllers/comment.controller.js';
import { verifyToken } from '../util/token.js';
import uploadMulter from '../util/uploadMulter.js';
import validImg from '../util/validator.img.js';

// Users
router.post('/addUser', createUser);
router.post('/auth', login);

// Post
router.post('/addPost', [verifyToken, uploadMulter, validImg], createPost);
router.get('/getAllPosts', verifyToken, getAllPost);
router.get('/getOnePost/:idPost', verifyToken, getOnePost);
router.delete('/deletePost/:idPost', verifyToken, deletePost);

// Comment
router.put('/addComment/:idPost', verifyToken, addComment);
router.put('/deleteComment/:idPost/:idComment', verifyToken, deleteComment);
router.put('/updateComment/:idPost/:idComment', verifyToken, updateComment);

export default router;