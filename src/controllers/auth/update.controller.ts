import { RequestHandler } from "express";
import Users from "../../models/user.model";
import User from "../../models/user.model";

const getOneUserData: RequestHandler = async (req, res) => {
   const { email } = req.body;

   try {
      if (!email) {
         return res.status(400).json({ message: "Please provide email" });
      }

      const userData = await Users.findOne({ email: email });

      if (!userData) {
         return res.status(400).json({ message: "." });
      }

      return res.status(200).json({ message: "User Found", user: userData });
   } catch (error) {
      console.log("Error ", error);
      res.status(500).json({ message: "Internal server error" });
   }
};

const updateUser: RequestHandler = async (req, res) => {
   const { userId } = req.params;
   const userFields = req.body;
   try {
      const userData = await User.findOne({ _id: userId });

      if (!userData)
         return res
            .status(400)
            .json({ error: true, message: "User Not found" });

      const updatedUser = await User.findByIdAndUpdate(
         userId,
         { userFields },
         { new: true }
      );

      return res.status(200).json({
         error: false,
         updatedUser,
         message: "User Updated Successfully",
      });
   } catch (error) {
      console.log("Error", error);
      res.status(500).json({ error: true, message: "Internal server error" });
   }
};

export default { getOneUserData, updateUser };
