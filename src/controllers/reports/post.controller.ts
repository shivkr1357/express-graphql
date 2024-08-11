import { RequestHandler } from "express";
import Reports from "../../models/reports.model";

// Create report API
const createReport: RequestHandler = async (req, res) => {
  const userId = req.body.user._id;
  const { content, postId } = req.body;

  try {
    const report = await Reports.create({
      content,
      postId,
      userId: userId,
    });

    return res.status(200).json({
      error: false,
      message: "Report Created Successfully",
      report,
    });
  } catch (error) {
    console.log("Error", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

// Update report API
const updateReport: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { content, postId } = req.body;

  try {
    const report = await Reports.findByIdAndUpdate(
      id,
      { content, postId },
      { new: true, runValidators: true }
    );

    if (!report) {
      return res.status(404).json({ error: true, message: "Report not found" });
    }

    return res.status(200).json({
      error: false,
      message: "Report Updated Successfully",
      report,
    });
  } catch (error) {
    console.log("Error", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

// Delete report API
const deleteReport: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await Reports.findByIdAndDelete(id);

    if (!report) {
      return res.status(404).json({ error: true, message: "Report not found" });
    }

    return res
      .status(200)
      .json({ error: false, message: "Report Deleted Successfully" });
  } catch (error) {
    console.log("Error", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

export default { createReport, updateReport, deleteReport };
