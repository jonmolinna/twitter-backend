import express from "express";
const router = express.Router();

import { createUser, login, getThreeUser } from '../controllers/user.controller.js';
import { createPost, getAllPost, getOnePost, deletePost } from '../controllers/post.controller.js';
import { addComment, deleteComment, updateComment } from '../controllers/comment.controller.js';
import { likePost, LikeCommentPost } from '../controllers/like.controller.js';
import { verifyToken } from '../util/token.js';
import uploadMulter from '../util/uploadMulter.js';
import validImg from '../util/validator.img.js';

// Users
router.post('/addUser', createUser);
router.post('/auth', login);
router.get('/getThreeUser', verifyToken, getThreeUser);

// Post
router.post('/addPost', [verifyToken, uploadMulter, validImg], createPost);
router.get('/getAllPosts', verifyToken, getAllPost);
router.get('/getOnePost/:idPost', verifyToken, getOnePost);
router.delete('/deletePost/:idPost', verifyToken, deletePost);

// Comment
router.put('/addComment/:idPost', verifyToken, addComment);
router.put('/deleteComment/:idPost/:idComment', verifyToken, deleteComment);
router.put('/updateComment/:idPost/:idComment', verifyToken, updateComment);

// Like
router.post('/likeComment/:idPost', verifyToken, likePost);
router.post('/likeCommentPost/:idPost/:idComment', verifyToken, LikeCommentPost);

export default router;