import { Post } from "./post";

export type Comment = {
  _id: string;
  user: string;
  post: Post;
  content: string;
};
