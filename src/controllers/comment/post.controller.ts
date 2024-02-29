import { RequestHandler } from "express";
import PostComments from "../../models/postComment.model";

const addComment: RequestHandler = async (req, res) => {
   // userId  should be of the one who is commenting

   const { comment, postId, userId } = req.body as any;

   if (!comment) {
      return res
         .status(400)
         .json({ error: true, message: "Comment field cannot be empty" });
   }

   const newComment = new PostComments({
      comment,
      postId,
      userId,
      likes: [],
   });

   await newComment.save();

   return res
      .status(200)
      .json({ error: true, message: " Comment added successfully" });
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

export default { addComment, likeComment };
