import { RequestHandler } from "express";
import User from "../../models/user.model";

const getAllUser: RequestHandler = async (req, res) => {
   try {
      let page = req.query.page ? parseInt(req.query.page as string) : 1;
      let limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      const users = await User.find()
         .select(
            "_id email fullName phone address profilePicture hobbies colorTheme isDeactivated gender language about blockedUsers"
         )
         .skip((page - 1) * limit)
         .limit(limit);

      if (users.length === 0) {
         return res
            .status(400)
            .json({ message: "No users found", error: true });
      }

      return res
         .status(200)
         .json({ message: "Users found successfully", error: false, users });
   } catch (error) {
      console.log("Error ", error);
      res.status(500).json({ message: "Internal Server Error", error: true });
   }
};

const getOneUserData: RequestHandler = async (req, res) => {
   const { email } = req.params;

   try {
      if (!email) {
         return res.status(400).json({ message: "Please provide email" });
      }

      const userData = await User.findOne({ email: email });

      if (!userData) {
         return res.status(400).json({ message: "." });
      }

      return res.status(200).json({ message: "User Found", user: userData });
   } catch (error) {
      console.log("Error ", error);
      res.status(500).json({ message: "Internal server error" });
   }
};

const searchUser: RequestHandler = async (req, res) => {
   const { q } = req.query;

   if (!q) {
      return res
         .status(400)
         .json({ error: true, message: "Query parameter `q` is required" });
   }

   try {
      const searchRegex = new RegExp(q as string, "i");

      const users = await User.find({
         $or: [
            { fullName: { $regex: searchRegex } },
            { email: { $regex: searchRegex } },
         ],
      }).select("-password");

      res.status(200).json({
         error: false,
         message: "Users found successfully",
         users,
      });
   } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: true, message: "Internal Server Error" });
   }
};

export default { getAllUser, getOneUserData, searchUser };
