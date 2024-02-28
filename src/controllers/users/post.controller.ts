import { RequestHandler } from "express";

const blockUser: RequestHandler = async (req, res) => {
   const { user } = req.body;
   const { blockId } = req.params;

   try {
      const isUpdated = user.blockedUsers.push(blockId);

      if (isUpdated) {
         await user.save();
      } else {
         return res
            .status(400)
            .json({ error: true, message: "Unable to block user" });
      }

      return res
         .status(200)
         .json({ error: false, message: "User blocked successfully" });
   } catch (error) {}
};

export default { blockUser };
