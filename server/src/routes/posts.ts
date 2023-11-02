import express, { Request, Response } from 'express';

import { getPosts, createPost, editPost, deletePost } from 'src/controllers/posts';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.put('/:id', editPost);
router.delete('/:id', deletePost);

export default router;