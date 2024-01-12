import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userTokenSchema = new Schema({
   userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Users",
   },
   token: {
      type: String,
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24 * 30, //30 days
   },
});

const UserToken = mongoose.model("userTokens", userTokenSchema);

export default UserToken;
