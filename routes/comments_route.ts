import * as express from "express";
import {
  getCommentById,
  getAllComments,
  getCommentsByPostId,
  createComment,
  updateCommentById,
  deleteCommentById,
} from "../controllers/comments_controller";

const router = express.Router();

router.get("/", getAllComments);

router.get("/:id", getCommentById);

router.get("/post/:id", getCommentsByPostId);

router.post("/", createComment);

router.put("/:id", updateCommentById);

router.delete("/:id", deleteCommentById);

module.exports = router;
