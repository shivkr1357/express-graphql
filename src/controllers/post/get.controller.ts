import { RequestHandler } from "express";
import Posts from "../../models/posts.model";
import { IPost } from "../../types/validator";

const getAllPosts: RequestHandler = async (req, res) => {
   const { page = "1", limit = "10" } = req.query;
   const currentPage: number = parseInt(page as string, 10) + 1;
   const limitValue: number = parseInt(limit as string, 10);

   try {
      // Calculate total number of posts
      const totalPosts = await Posts.countDocuments();

      // Fetch the paginated posts
      const posts = await Posts.find()
         .select("-updatedAt -__v") // Exclude updatedAt and __v fields
         .populate({
            path: "comments",
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
         message: "Posts found Successfully",
         pagination: {
            totalRecords: totalPosts,
            currentPage,
            totalPages: Math.ceil(totalPosts / limitValue),
            pageSize: limitValue,
         },
         posts,
      });
   } catch (error) {
      console.log("Error ", error);
      res.status(500).json({ error: true, message: "Internal Server Error" });
   }
};

const getPostById: RequestHandler = async (req, res) => {
   const postId = req.params.id;
   try {
      const postData: IPost | null = await Posts.findById({
         _id: postId,
      }).populate("comments");

      if (!postData)
         return res
            .status(400)
            .json({ error: true, message: "Post not found" });

      return res
         .status(200)
         .json({ error: false, message: "Post found successfully", postData });
   } catch (error) {
      console.log("Error", error);
      return res
         .status(500)
         .json({ error: true, message: "Internal Server Error" });
   }
};

const searchPost: RequestHandler = async (req, res) => {
   const { q } = req.query;

   if (!q) {
      return res
         .status(400)
         .json({ error: true, message: "Query parameter `q` is required" });
   }

   try {
      const searchRegex = new RegExp(q as string, "i");

      const posts: IPost[] = await Posts.find({
         $or: [
            { title: { $regex: searchRegex } },
            { description: { $regex: searchRegex } },
         ],
      });

      res.status(200).json({
         error: false,
         message: "Posts found successfully",
         posts,
      });
   } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: true, message: "Internal Server Error" });
   }
};

export default { getAllPosts, getPostById, searchPost };
