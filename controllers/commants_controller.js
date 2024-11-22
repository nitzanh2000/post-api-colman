const commentsModel = require("../models/comments_model");

const getAllCommnants = async (req, res) => {
    try {
        const commants = await commentsModel.find();
        res.send(commants);
      } catch (error) {
        res.status(400).send(error.message);
      }
}

const getCommantById = async (req, res) => {
    try {
        const commentId = req.params.id;
        const commant = await commentsModel.findById(commentId);
        res.send(commant);
      } catch (error) {
        res.status(400).send(error.message);
      }
}

const getCommantsByPostId = async (req, res) => {
    try {
        const postId = req.params.postId;
        const commants = await commentsModel.find({ postId});
        res.send(commants);
      } catch (error) {
        res.status(400).send(error.message);
      }
}

const insertComment = async ({ body: { postId, content, user } }, res) => {
  const comment = {
    postId, content, user
  }

  try {
    await commentsModel.create(comment);
    res.status(201).send();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteComment = async (req, res) => {
  try {
      const commentId = req.params.id;
      console.log({commentId})
      await commentsModel.findByIdAndDelete(commentId)
      res.status(200).send();
    } catch (error) {
      res.status(400).send(error.message);
    }
}

const updateComment = async (req, res) => {
  try {
      const commentId = req.params.id;
      const updatedComment = {
        postId: req.body.postId,
        content: req.body.content,
        user: req.body.user
    }

      await commentsModel.findByIdAndUpdate(commentId, updatedComment)
      res.status(200).send();
    } catch (error) {
      res.status(400).send(error.message);
    }
}


module.exports = {
    getAllCommnants,
    getCommantById,
    getCommantsByPostId,
    insertComment,
    deleteComment,
    updateComment
};
