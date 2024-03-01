import mongoose from "mongoose";
import { IPostReport } from "../types/validator";

const Schema = mongoose.Schema;

const postReportSchema = new Schema<IPostReport>(
   {
      content: {
         required: true,
         type: String,
         default: "",
      },
      postId: {
         type: Schema.Types.ObjectId,
         ref: "Posts",
      },
      ReporterUserId: {
         type: Schema.Types.ObjectId,
         ref: "Users",
      },
   },
   { timestamps: true }
);

const PostReports = mongoose.model("PostReports", postReportSchema);

export default PostReports;
