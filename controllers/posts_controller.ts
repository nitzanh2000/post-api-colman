import { Request, Response } from "express";
import { Post } from "../dtos/post";
import { PostModel } from "../models/posts_model";

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const postOwner: string = String(req.query.postOwner || "");
    let posts: Post[];

    if (!!postOwner) {
      posts = await PostModel.find({ owner: postOwner }).populate("owner");
    } else {
      posts = await PostModel.find().populate("owner");
    }

    res.send(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getPostById = async ({ params: { id } }: Request, res: Response) => {
  try {
    const post: Post = await PostModel.findById(id).populate("owner");
    if (!!post) {
      res.send(post);
    } else {
      res.status(404).send("Cannot find specified post");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addNewPost = async ({ body }: Request, res: Response) => {
  const newPost = {
    title: body.title,
    owner: body.sender,
    content: body.content,
  };

  try {
    const post: Post = await PostModel.create(newPost);
    res.status(201).send(post);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updatePostById = async ({ params: { id }, body }: Request, res: Response) => {
  const updatedPostContent: Post = body;

  try {
    const result = await PostModel.updateOne(
      { _id: id },
      updatedPostContent
    ).populate("owner");

    if (!!result.modifiedCount) {
      res.status(201).send();
    } else {
      res.status(404).send("Cannot find specified post");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const deletePostById = async ({ params: { id } }: Request, res: Response) => {
  try {
    const result = await PostModel.deleteOne({ _id: id });

    if (!!result.deletedCount) {
      res.status(200).send("The post deleted");
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { getAllPosts, getPostById, addNewPost, updatePostById, deletePostById };
