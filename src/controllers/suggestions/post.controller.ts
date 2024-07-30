import { RequestHandler } from "express";
import Suggestions from "../../models/suggestions.model";
import { ISuggestions } from "../../types/validator";

const createSuggestion: RequestHandler = async (req, res) => {
   const userData = req.body.user;

   const { suggestions } = req.body;

   try {
      const suggestion: ISuggestions = await Suggestions.create({
         suggestions,
         userId: userData._id,
      });

      return res.status(200).json({
         error: false,
         message: "Suggestions Created Successfully",
         suggestion,
      });
   } catch (error) {
      console.log("Error", error);
      return res
         .status(500)
         .json({ error: true, message: "Internal Server Error" });
   }
};

// Update suggestion API
const updateSuggestion: RequestHandler = async (req, res) => {
   const { id } = req.params;
   const { suggestions } = req.body;

   try {
      const suggestion = await Suggestions.findByIdAndUpdate(
         id,
         { suggestions },
         { new: true, runValidators: true }
      );

      if (!suggestion) {
         return res
            .status(404)
            .json({ error: true, message: "Suggestion not found" });
      }

      return res.status(200).json({
         error: false,
         message: "Suggestion Updated Successfully",
         suggestion,
      });
   } catch (error) {
      console.log("Error", error);
      return res
         .status(500)
         .json({ error: true, message: "Internal Server Error" });
   }
};

// Delete suggestion API
const deleteSuggestion: RequestHandler = async (req, res) => {
   const { id } = req.params;

   try {
      const suggestion = await Suggestions.findByIdAndDelete(id);

      if (!suggestion) {
         return res
            .status(404)
            .json({ error: true, message: "Suggestion not found" });
      }

      return res
         .status(200)
         .json({ error: false, message: "Suggestion Deleted Successfully" });
   } catch (error) {
      console.log("Error", error);
      return res
         .status(500)
         .json({ error: true, message: "Internal Server Error" });
   }
};

export default { createSuggestion, updateSuggestion, deleteSuggestion };
