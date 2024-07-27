import { RequestHandler } from "express";
import Posts from "../../models/posts.model";
import { createPostBodyValidate } from "../../utils/validations";

const createPost: RequestHandler = async (req, res) => {
  // const { error } = createPostBodyValidate(req.body);
  // if (error) {
  //   return res.status(400).json({
  //     error: true,
  //     message: "Validation Error",
  //     details: error.details.map((err) => err.message),
  //   });
  // }

  const userData = req.body.user;

  const { title, description, image, tags, postType, likes, comments } =
    req.body;

  try {
    const newPost = await Posts.create({
      title,
      description,
      userId: userData._id,
      image,
      tags,
      postType,
      likes: likes,
      comments: comments,
    });

    return res
      .status(200)
      .json({ error: false, message: "Post Created Successfully", newPost });
  } catch (error) {
    console.log("Error", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const updatePost: RequestHandler = async (req, res) => {
  try {
    const postId = req.params;

    const { title, description, image, tags, postType } = req.body;

    const post = await Posts.findById({ postId });

    if (!post) {
      return res.status(400).json({ error: true, message: "Post not found" });
    }

    if (title) post.title = title;
    if (description) post.description = description;
    if (image) post.image = image;
    if (tags) post.tags = tags;
    if (postType) post.postType = postType;

    await post.save();

    return res.status(200).json({
      error: false,
      message: "Post Updated successfully",
      updatedPost: post,
    });
  } catch (error) {
    console.log("Error : ", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const deletePost: RequestHandler = async (req, res) => {
  try {
    const postId = req.params;

    const post = await Posts.findById({ postId });

    if (!post) {
      return res.status(400).json({ error: true, message: "Post not found" });
    }

    await post.deleteOne();

    return res
      .status(200)
      .json({ error: true, message: "Post deleted successfully" });
  } catch (error) {
    console.log("Error", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

export default { createPost, updatePost, deletePost };
