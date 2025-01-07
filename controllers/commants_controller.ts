import { Request, Response } from "express";
import { CommentModel } from "../models/comments_model";
import { Comment } from "../dtos/comment";

const getAllComments = async (req: Request, res: Response) => {
  const userId: string = String(req.query.user || "");

  try {
    let comments: Comment[];

    if (!!userId) {
      comments = await CommentModel.find({ user: userId }).populate("post", "user");
    } else {
      comments = await CommentModel.find().populate("post", "user");
    }
    res.send(comments);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getCommentById = async (req: Request, res: Response) => {
  const commentId: string = req.params.id;

  try {
    const comment: Comment = await CommentModel.findById(commentId).populate("post", "user");
    if (!!comment) {
      res.send(comment);
    } else {
      res.status(404).send("Comment not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getCommentsByPostId = async (req: Request, res: Response) => {
  const postId: string = req.params.id;

  try {
    const comments: Comment[] = await CommentModel.find({ post: postId });

    if (!!comments.length) {
      res.send(comments);
    } else {
      res.status(404).send("No comments found for post: " + postId);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createComment = async (req: Request, res: Response) => {
  const newComment = req.body;
  try {
    const comment = await CommentModel.create(newComment);
    res.status(201).send(comment);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteCommentById = async (req: Request, res: Response) => {
  const commentId = req.params.id;

  try {
    const comment = await CommentModel.deleteOne({ _id: commentId });
    if (!!comment.deletedCount) {
      res.status(200).send("The comment deleted");
    } else {
      res.status(404).send("Comment not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateComment = async (req: Request, res: Response) => {
  const commentId = req.params.id;
  const updatedComment = req.body;

  try {
    const result = await CommentModel.updateOne(
      { _id: commentId },
      updatedComment
    );
    if (!!result.modifiedCount) {
      res.status(201).send();
    } else {
      res.status(404).send("comment not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export {
  getAllComments,
  getCommentById,
  getCommentsByPostId,
  createComment,
  updateComment,
  deleteCommentById,
};
