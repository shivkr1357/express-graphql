import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postCommentSchema = new Schema(
   {
      comment: {
         type: String,
         default: "",
      },
      postId: {
         type: Schema.Types.ObjectId,
         ref: "Posts",
      },
      userId: {
         type: Schema.Types.ObjectId,
         ref: "Users",
      },
      likes: {
         type: [{ type: Schema.Types.ObjectId, ref: "Users" }],
         default: [],
      },
   },
   { timestamps: true }
);

const PostComments = mongoose.model("PostComments", postCommentSchema);

export default PostComments;
