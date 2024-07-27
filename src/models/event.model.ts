import mongoose from "mongoose";
import { IEvent } from "../types/validator";

const Schema = mongoose.Schema;

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    dateOfEvent: {
      type: String,
      default: "",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const Events = mongoose.model("Events", eventSchema);

export default Events;
