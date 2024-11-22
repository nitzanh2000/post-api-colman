const express = require("express");
const commantsController = require("../controllers/commants_controller");

const router = express.Router();

router.get("/", commantsController.getAllCommnants);

router.get("/:id", commantsController.getCommantById);

router.get("/byPostId/:postId", commantsController.getCommantsByPostId);

router.post("/", commantsController.insertComment);

router.delete("/:commentId", commantsController.deleteComment);

router.put("/:commentId", commantsController.updateComment);


module.exports = router;
