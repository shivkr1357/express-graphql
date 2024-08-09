import { RequestHandler } from "express";

import Events from "../../models/event.model";

const createEvent: RequestHandler = async (req, res) => {
  const userData = req.body.user;

  const { title, description, location, dateOfEvent } = req.body;

  try {
    const event = await Events.create({
      title,
      description,
      location,
      dateOfEvent,
      userId: userData._id,
    });

    return res
      .status(200)
      .json({ error: false, message: "Event Created Successfully", event });
  } catch (error) {
    console.log("Error", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const updateEvent: RequestHandler = async (req, res) => {
  // Validate request body

  const id = req.params.id; // Assume eventId is provided in the route params
  const { title, description, location, dateOfEvent } = req.body;

  try {
    // Check if the event exists
    const event = await Events.findById(id);
    if (!event) {
      return res.status(404).json({ error: true, message: "Event not found" });
    }

    // Update the event
    const updatedEvent = await Events.findByIdAndUpdate(
      id,
      {
        title,
        description,
        location,
        dateOfEvent,
      },
      { new: true } // Return the updated document
    );

    return res.status(200).json({
      error: false,
      message: "Event Updated Successfully",
      updatedEvent,
    });
  } catch (error) {
    console.log("Error", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const deleteEvent: RequestHandler = async (req, res) => {
  const eventId = req.params.Id;

  if (!eventId) {
    res.status(400).json({ error: true, message: "Event Id is required " });
  }

  const response = await Events.findByIdAndDelete({ _id: eventId });

  if (!response)
    res.status(400).json({ error: true, message: "Event Not found " });

  res.status(200).json({
    error: false,
    message: "Event deleted successfully",
  });
  try {
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

export default { createEvent, updateEvent, deleteEvent };
