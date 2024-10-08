import { RequestHandler } from "express";
import { ISuggestions } from "../../types/validator";
import Suggestions from "../../models/suggestions.model";

const getAllSuggestions: RequestHandler = async (req, res) => {
  const { page = "1", limit = "10" } = req.query;
  const currentPage: number = parseInt(page as string, 10) + 1;
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
    const totalSuggestions = await Suggestions.countDocuments();

    // Fetch suggestions with pagination
    const suggestions: ISuggestions[] = await Suggestions.find()
      .select("-updatedAt -__v") // Exclude fields
      .populate({
        path: "userId",
        select: "fullName email", // Include specific fields from user
      })
      .sort({ createdAt: -1 }) // Sort by creation date
      .skip((currentPage - 1) * limitValue) // Skip records based on the page number
      .limit(limitValue); // Limit the number of records per page

    // Calculate total pages
    const totalPages = Math.ceil(totalSuggestions / limitValue);

    res.status(200).json({
      error: false,
      message: "Suggestions found Successfully",
      suggestions,
      pagination: {
        currentPage,
        totalPages,
        totalRecords: totalSuggestions,
        limit: limitValue,
      },
    });
  } catch (error) {
    console.log("Error ", error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

const getOneSuggestion: RequestHandler = async (req, res) => {
  const suggestionsId = req.params.id;

  if (!suggestionsId) {
    res.status(400).json({
      error: true,
      message: "Suggestion Id is required",
    });
  }
  try {
    const suggestion: ISuggestions | null = await Suggestions.findById({
      _id: suggestionsId,
    }).populate({
      path: "userId",
      select: "fullName email", // Include only name and email from user
    });

    if (!suggestion) {
      return res.status(400).json({
        error: true,
        message: "No Suggestion found with provided Id",
      });
    }

    return res
      .status(200)
      .json({ error: false, message: "Suggestions Found", suggestion });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

export default { getAllSuggestions, getOneSuggestion };
