import express from 'express';

import { getPosts, createPost, editPost, deletePost, likePost } from 'src/controllers/posts';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.put('/:id', editPost);
router.put('/:id/like', likePost);
router.delete('/:id', deletePost);

export default router;