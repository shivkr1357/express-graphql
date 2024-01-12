import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
   email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      default: "",
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   fullName: {
      type: String,
      required: true,
      trim: true,
   },
   phone: {
      type: String,
      unique: true,
      required: true,
   },
   deviceToken: {
      type: String,
      default: "",
   },
   address: {
      type: String,
      default: "",
   },
   profilePicture: {
      type: String,
      required: true,
      default: "",
   },
   hobbies: {
      type: Array,
      default: [],
   },
   colorTheme: {
      type: String,
      default: "",
   },
   isDeactivated: {
      type: Boolean,
      default: false,
   },
   gender: {
      type: String,
      default: "",
   },
   language: {
      type: String,
      default: "",
   },
   about: {
      type: String,
      default: "",
   },
});

const User = mongoose.model("Users", userSchema);

export default User;
