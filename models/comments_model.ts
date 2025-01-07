import mongoose from "mongoose";
import { Comment } from "../dtos/comment";

const commentsSchema = new mongoose.Schema<Comment>({
  user: {
    type: String,
    required: true,
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: "posts",
    required: true,
  },
  content: String,
});

export const CommentModel = mongoose.model<Comment>("comments", commentsSchema);