import { RequestHandler } from "express";
import Posts from "../../models/posts.model";

const createPost: RequestHandler = async (req, res) => {
  const userData = req.body.user;

  const { title, description, image, tags, postType } = req.body;

  try {
    const newPost = await Posts.create({
      title,
      description,
      userId: userData._id,
      image,
      tags,
      postType,
      likes: [],
      comments: [],
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

export default { createPost };
