import mongoose from "mongoose";
import { IPostReport } from "../types/validator";

const Schema = mongoose.Schema;

const reportSchema = new Schema<IPostReport>(
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

const Reports = mongoose.model("Reports", reportSchema);

export default Reports;
