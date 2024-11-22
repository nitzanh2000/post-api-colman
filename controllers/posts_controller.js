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

const addNewPost = async ({ body: { title, sender, content } }, res) => {
  const post = {
    title, owner: sender, content
  }

  try {
    await PostModel.create(post);
    res.status(201).send();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updatePostById = async ( req, res) => {
  const post = {
    title : req.body.title,
    content: req.body.content,
    owner: req.body.sender
  }
  const postId = req.params.id

  try {
    const result = await PostModel.updateOne({ _id : postId }, post);

    if (result.modifiedCount > 0) {
      res.status(201).send();
    } else {
      throw new Error("Post not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  addNewPost,
  updatePostById
};
