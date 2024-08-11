import { RequestHandler } from "express";
import Reports from "../../models/reports.model";
import { IPostReport } from "../../types/validator";

// Get one report API
const getReport: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await Reports.findById(id)
      .populate("postId")
      .populate("ReporterUserId");

    if (!report) {
      return res.status(404).json({ error: true, message: "Report not found" });
    }

    return res.status(200).json({ error: false, report });
  } catch (error) {
    console.log("Error", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const getAllReports: RequestHandler = async (req, res) => {
  const { page = "1", limit = "10" } = req.query;
  const currentPage: number = parseInt(page as string, 10);
  const limitValue: number = parseInt(limit as string, 10);

  // Validate page and limit
  if (isNaN(currentPage) || currentPage < 1) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid page number" });
  }
  if (isNaN(limitValue) || limitValue < 1) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid limit value" });
  }

  try {
    // Get the total count of records
    const totalReports = await Reports.countDocuments();

    // Fetch reports with pagination
    const reports: IPostReport[] = await Reports.find()
      .select("-updatedAt -__v") // Exclude fields
      .populate({
        path: "userId",
        select: "fullName email", // Include specific fields from user
      })
      .sort({ createdAt: -1 }) // Sort by creation date
      .skip((currentPage - 1) * limitValue) // Skip records
      .limit(limitValue); // Limit records

    // Calculate total pages
    const totalPages = Math.ceil(totalReports / limitValue);

    res.status(200).json({
      error: false,
      message: "Reports found successfully",
      reports,
      pagination: {
        currentPage,
        totalPages,
        totalReports,
        limit: limitValue,
      },
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

export default { getReport, getAllReports };
