import { Request, Response } from 'express';
import PostMessage from '../models/postMessage';
import mongoose from 'mongoose';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (err) {
    if (!!err) {
      console.error(err);
      res.status(404).json({ message: err });
    }
  }
}

export const createPost = async (req: Request, res: Response) => {
  const { title, message, creator, selectedFile, tags } = req.body;

  try {
    const newPost = new PostMessage({ title, message, creator, selectedFile, tags });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    if (!!err) {
      console.error(err);
      res.status(409).json({ message: err });
    }
  }
}

export const editPost = async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, message, creator, selectedFile, tags } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const postData = { creator, title, message, tags, selectedFile, _id: id, updatedAt: new Date() };

    const updatedPost = await PostMessage.findByIdAndUpdate(id, postData, { new: true });

    res.status(200).json(updatedPost);
  } catch (err) {
    if (!!err) {
      console.error(err);
      res.status(409).json({ message: err });
    }
  }
}

export const likePost = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const post = await PostMessage.findById(id);

    if (!mongoose.Types.ObjectId.isValid(id) || !post) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    res.status(200).json({id, likeCount: updatedPost?.likeCount});
  } catch (err) {
    if (!!err) {
      console.error(err);
      res.status(409).json({ message: err });
    }
  }
}

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.status(200).json({id});
  } catch (err) {
    if (!!err) {
      console.error(err);
      res.status(409).json({ message: err });
    }
  }
}
