import { RequestHandler } from "express";
import { PostCommentsType } from "../../types/validator";
import PostComments from "../../models/postComment.model";

const getAllComments: RequestHandler = async (req, res) => {
  const { page = "1", limit = "10" } = req.query;
  const currentPage: number = parseInt(page as string, 10) + 1;
  const limitValue: number = parseInt(limit as string, 10);

  try {
    // Get the total count of records
    const totalRecords = await PostComments.countDocuments();

    // Fetch comments with pagination
    const comments: PostCommentsType[] = await PostComments.find()
      .select("-updatedAt -__v") // Exclude updatedAt and __v fields
      .populate({
        path: "userId",
        select: "fullName email", // Include only name and email from user
      })
      .sort({ createdAt: -1 }) // Sort by creation date in descending order
      .skip((currentPage - 1) * limitValue) // Skip records based on the page number
      .limit(limitValue); // Limit the number of records per page

    // Calculate total pages
    const totalPages = Math.ceil(totalRecords / limitValue);

    res.status(200).json({
      error: false,
      message: "Comments found Successfully",
      comments,
      pagination: {
        currentPage,
        totalPages,
        totalRecords,
        limit: limitValue,
      },
    });
  } catch (error) {
    console.log("Error ", error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

const getCommentById: RequestHandler = async (req, res) => {
  const { commentId } = req.query;

  if (!commentId) {
    return res.status(400).json({
      error: true,
      message: "Comment Id is required for getting comment",
    });
  }

  try {
    const commentData = await PostComments.findById({ commentId });

    return res.status(200).json({
      error: false,
      message: "Comment Found Successfully",
      comment: commentData,
    });
  } catch (error) {
    console.log("Error", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

export default { getAllComments, getCommentById };
