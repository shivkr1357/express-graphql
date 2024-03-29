import { RequestHandler } from "express";
import Posts from "../../models/posts.model";
import { IPost } from "../../types/validator";

const getAllPosts: RequestHandler = async (req, res) => {
   const { page = "1", limit = "10" } = req.query;
   const currentPage: number = parseInt(page as string, 10);
   const limitValue: number = parseInt(limit as string, 10);

   try {
      const totalPosts: number = await Posts.countDocuments();
      const allPostsWithComments: IPost[] = await Posts.find()
         .populate("comments")
         .sort({ createdAt: -1 }) // Sort by creation date in descending order
         .skip((currentPage - 1) * limitValue) // Skip records based on the page number
         .limit(limitValue); // Limit the number of records per page

      res.status(200).json({
         error: false,
         message: "Posts found Successfully",
         allPostsWithComments,
         totalPosts,
         currentPage,
         totalPages: Math.ceil(totalPosts / limitValue),
      });
   } catch (error) {
      console.log("Error ", error);
      res.status(500).json({ error: true, message: "Internal Server Error" });
   }
};

const getPostById: RequestHandler = async (req, res) => {
   const postId = req.params.id;
   try {
      const postData = await Posts.findById({ _id: postId }).populate(
         "comments"
      );

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

export default { getAllPosts, getPostById };
