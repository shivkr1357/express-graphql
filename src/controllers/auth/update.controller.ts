import { RequestHandler } from "express";

import User from "../../models/user.model";

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

export default { updateUser };
