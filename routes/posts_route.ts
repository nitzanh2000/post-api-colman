import * as express from "express";
import {
  getAllPosts,
  getPostById,
  addNewPost,
  updatePostById,
  deletePostById,
}
  from "../controllers/posts_controller";

const router = express.Router();

router.get("/", getAllPosts);

router.get("/:id", getPostById);

router.post("/", addNewPost);

router.put("/:id", updatePostById);

router.put("/:id", deletePostById);

module.exports = router;
