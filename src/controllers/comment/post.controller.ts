import { RequestHandler } from "express";
import PostComments from "../../models/postComment.model";

const addComment: RequestHandler = async (req, res) => {
  const { comment, postId } = req.body;
  const userId = req.body.user._id; // Assuming userId is included in req.body.user

  if (!comment) {
    return res
      .status(400)
      .json({ error: true, message: "Comment field cannot be empty" });
  }

  try {
    const newComment = new PostComments({
      comment,
      postId,
      userId,
      likes: [],
    });

    await newComment.save();

    return res
      .status(200)
      .json({
        error: false,
        message: "Comment added successfully",
        comment: newComment,
      });
  } catch (error) {
    console.log("Error", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

// Like the comment

const likeComment: RequestHandler = async (req, res) => {
  // Get the userId who has liked the comment

  const { userId, commentId } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json({ error: true, message: "Liked user id cannot be empty" });
  }

  const post = await PostComments.findById({ commentId });

  if (!post) {
    return res.status(400).json({ error: true, message: "Post not found" });
  }

  post.likes.push(userId);

  await post.save();

  return res
    .status(200)
    .json({ error: false, message: "Comment Liked successfully" });
};

const updateComment: RequestHandler = async (req, res) => {
  const { comment } = req.body as any;
  const { commentId } = req.query;

  if (!commentId) {
    return res.status(400).json({
      error: true,
      message: "Comment Id is required for updating the comment",
    });
  }

  if (!comment) {
    return res
      .status(400)
      .json({ error: true, message: "Comment field cannot be empty" });
  }

  try {
    // Update the comment with the new content
    const updatedComment = await PostComments.findByIdAndUpdate(
      commentId,
      { comment },
      { new: true } // Return the updated document
    );

    if (!updatedComment) {
      return res.status(404).json({
        error: true,
        message: "Comment not found with the provided ID",
      });
    }

    return res.status(200).json({
      error: false,
      message: "Comment updated successfully",
      comment: updatedComment,
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

const deleteComment: RequestHandler = async (req, res) => {
  const { commentId } = req.query;

  if (!commentId) {
    return res.status(400).json({
      error: true,
      message: "Comment Id is required for updating the comment",
    });
  }

  try {
    const response = await PostComments.findByIdAndDelete({ commentId });

    if (!response) {
      return res.status(400).json({
        error: true,
        message: "Error Deleting the comment",
      });
    }
    return res
      .status(200)
      .json({ error: false, message: "Comment Deleted Successfully" });
  } catch (error) {
    console.log("Error", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

export default { addComment, likeComment, updateComment, deleteComment };
