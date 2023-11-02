import { Request, Response } from 'express';
import PostMessage from '../models/postMessage';
import mongoose from 'mongoose';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const postMessages = await PostMessage.find();
    console.log({postMessages});
    res.status(200).json(postMessages);
  } catch (err) {
    if (!!err) {
      console.error(err);
      res.status(404).json({ message: err });
    }
  }
}

export const createPost = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const newPost = new PostMessage(body);

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

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.status(200).json(updatedPost);
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

    res.status(200).json({ message: "Post deleted successfully." });
  } catch (err) {
    if (!!err) {
      console.error(err);
      res.status(409).json({ message: err });
    }
  }
}
