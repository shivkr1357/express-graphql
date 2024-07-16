import mongoose from "mongoose";
import { IPost } from "../types/validator";

const Schema = mongoose.Schema;

const postSchema = new Schema<IPost>(
   {
      title: {
         required: true,
         type: String,
         trim: true,
      },
      description: {
         type: String,
         trim: true,
      },
      userId: {
         type: Schema.Types.ObjectId,
         ref: "Users",
      },
      image: {
         type: String,
         default: "",
      },
      tags: {
         type: [String],
         default: [],
      },
      postType: {
         type: String,
         default: "",
      },
      likes: {
         type: [{ type: Schema.Types.ObjectId, ref: "Users" }],
         default: [],
      },
      comments: {
         type: [{ type: Schema.Types.ObjectId, ref: "PostComments" }],
      },
   },
   { timestamps: true }
);

const Posts = mongoose.model("Posts", postSchema);

export default Posts;
