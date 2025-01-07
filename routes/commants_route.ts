import * as express from "express";
import {
  getCommentById,
  getAllComments,
  getCommentByPostId,
  createComment,
  updateComment,
  deleteCommentById,
} from "../controllers/commants_controller";

const router = express.Router();

router.get("/", getAllComments);

router.get("/:id", getCommentById);

router.get("/post/:id", getCommentByPostId);

router.post("/", createComment);

router.put("/:id", updateComment);

router.delete("/:id", deleteCommentById);

module.exports = router;
