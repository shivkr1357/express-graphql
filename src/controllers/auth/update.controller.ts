import { RequestHandler } from "express";
import Users from "../../models/user.model";

const getOneUserData: RequestHandler = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Please provide email" });
    }

    const userData = await Users.findOne({ email: email });

    if (!userData) {
      return res
        .status(400)
        .json({ message: "No user found with the provided email" });
    }

    return res.status(200).json({ message: "User Found", user: userData });
  } catch (error) {
    console.log("Error ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default { getOneUserData };
