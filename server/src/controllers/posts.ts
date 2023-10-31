import { Request, Response } from "express";
import PostMessage from "../models/postMessage";

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

  // res.send('Controller working')
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
