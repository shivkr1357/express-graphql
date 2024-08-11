import { RequestHandler } from "express";
import User from "../../models/user.model";

const getAllUser: RequestHandler = async (req, res) => {
  const { page = "1", limit = "10" } = req.query;
  const currentPage: number = parseInt(page as string, 10) + 1;
  const limitValue: number = parseInt(limit as string, 10);

  // Validate page and limit
  if (isNaN(currentPage) || currentPage < 1) {
    return res
      .status(400)
      .json({ message: "Invalid page number", error: true });
  }
  if (isNaN(limitValue) || limitValue < 1) {
    return res
      .status(400)
      .json({ message: "Invalid limit value", error: true });
  }

  try {
    // Get the total count of users
    const totalUsers = await User.countDocuments();

    // Fetch users with pagination
    const users = await User.find()
      .select(
        "_id email fullName phone address profilePicture hobbies colorTheme isDeactivated gender language about blockedUsers"
      )
      .skip((currentPage - 1) * limitValue)
      .limit(limitValue);

    // Calculate total pages
    const totalPages = Math.ceil(totalUsers / limitValue);

    res.status(200).json({
      message: "Users found successfully",
      error: false,
      users,
      pagination: {
        currentPage,
        totalPages,
        totalRecords: totalUsers,
        limit: limitValue,
      },
    });
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
