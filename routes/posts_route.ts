import * as express from "express";
import {
  getAllPosts,
  getPostById,
  addNewPost,
  updatePost,
} from "../controllers/posts_controller";

const router = express.Router();

router.get("/", getAllPosts);

router.get("/:id", getPostById);

router.post("/", addNewPost);

router.put("/:id", updatePost);

module.exports = router;
