const PostModel = require("../models/posts_model");

const getAllPosts = async (req, res) => {
  const sender = req.query.sender;

  try {
    const posts = await (sender
      ? PostModel.find({ owner: sender })
      : PostModel.find());
    res.send(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getPostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await PostModel.findById(postId);
    post ? res.send(post) : res.status(404).send("Post not found");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addNewPost = async ({ body }, res) => {
  const post = body

  try {
    await PostModel.create(post);
    res.status(201);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  addNewPost
};
