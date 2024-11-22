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
        const commentId = req.id;
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

const deleteComment = (postId) => {

}

const updateComment = (postId) => {

}


module.exports = {
    getAllCommnants,
    getCommantById,
    getCommantsByPostId,
    insertComment,
    deleteComment,
    updateComment
};
