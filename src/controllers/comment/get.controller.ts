import { RequestHandler } from "express";
import { PostCommentsType } from "../../types/validator";
import PostComments from "../../models/postComment.model";

const getAllComments: RequestHandler = async (req, res) => {
   const { page = "1", limit = "10" } = req.query;
   const currentPage: number = parseInt(page as string, 10);
   const limitValue: number = parseInt(limit as string, 10);

   try {
      const comments: PostCommentsType[] = await PostComments.find()
         .select("-updatedAt -__v") // Exclude updatedAt and __v fields
         .populate({
            path: "postId",
            select: "-updatedAt -__v", // Exclude these fields from comments too
         })
         .populate({
            path: "userId",
            select: "fullName email", // Include only name and email from user
         })
         .sort({ createdAt: -1 }) // Sort by creation date in descending order
         .skip((currentPage - 1) * limitValue) // Skip records based on the page number
         .limit(limitValue); // Limit the number of records per page

      res.status(200).json({
         error: false,
         message: "Comments found Successfully",
         comments,
      });
   } catch (error) {
      console.log("Error ", error);
      res.status(500).json({ error: true, message: "Internal Server Error" });
   }
};

export default { getAllComments };
