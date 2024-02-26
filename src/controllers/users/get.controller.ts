import { RequestHandler } from "express";
import User from "../../models/user.model";

const getAllUser: RequestHandler = async (req, res) => {
   try {
      let page = req.query.page ? parseInt(req.query.page as string) : 1;
      let limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      const users = await User.find()
         .skip((page - 1) * limit)
         .limit(limit);

      if (users.length == 0) {
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
   const { email } = req.body;

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

export default { getAllUser, getOneUserData };
