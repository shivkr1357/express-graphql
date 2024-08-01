import { RequestHandler } from "express";
import { IEvent } from "../../types/validator";
import Events from "../../models/event.model";

const getAllEvents: RequestHandler = async (req, res) => {
   const { page = "1", limit = "10" } = req.query;
   const currentPage: number = parseInt(page as string, 10) + 1; // Correct radix
   const limitValue: number = parseInt(limit as string, 10);

   try {
      console.log("Pagenumber", currentPage);
      // Get the total count of records
      const totalRecords = await Events.countDocuments();

      // Fetch events with pagination
      const events: IEvent[] = await Events.find()
         .select("-updatedAt -__v") // Exclude updatedAt and __v fields
         .populate({
            path: "userId",
            select: "fullName email", // Include only name and email from user
         })
         .sort({ createdAt: -1 }) // Sort by creation date in descending order
         .skip((currentPage - 1) * limitValue) // Skip records based on the page number
         .limit(limitValue); // Limit the number of records per page

      // Calculate total pages
      const totalPages = Math.ceil(totalRecords / limitValue);

      res.status(200).json({
         error: false,
         message: "Events found Successfully",
         events,
         pagination: {
            currentPage,
            totalPages,
            totalRecords,
            limit: limitValue,
         },
      });
   } catch (error) {
      console.log("Error ", error);
      res.status(500).json({ error: true, message: "Internal Server Error" });
   }
};

const getOneEvent: RequestHandler = async (req, res) => {
   const eventId = req.params.id;

   if (!eventId) {
      res.status(400).json({ error: true, message: "Event Id is required" });
   }
   try {
      const event: IEvent | null = await Events.findById({
         _id: eventId,
      }).populate({
         path: "userId",
         select: "fullName email", // Include only name and email from user
      });

      if (!event) {
         return res
            .status(400)
            .json({ error: true, message: "No event found with provided Id" });
      }

      return res
         .status(200)
         .json({ error: false, message: "Event Found", event });
   } catch (error) {
      console.log("Error: ", error);
      res.status(500).json({ error: true, message: "Internal Server Error" });
   }
};

export default { getAllEvents, getOneEvent };
