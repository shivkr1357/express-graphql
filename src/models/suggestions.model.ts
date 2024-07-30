import mongoose from "mongoose";
import { ISuggestions } from "../types/validator";

const Schema = mongoose.Schema;

const suggestionSchema = new Schema<ISuggestions>(
   {
      suggestions: {
         type: String,
         required: true,
         default: "",
      },
      userId: {
         type: Schema.Types.ObjectId,
         ref: "Users",
      },
   },
   { timestamps: true }
);

const Suggestions = mongoose.model("Suggestions", suggestionSchema);

export default Suggestions;
