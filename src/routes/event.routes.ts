import { Router } from "express";
import postController from "../controllers/events/post.controller";
import getController from "../controllers/events/get.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: API operations for Event actions
 */

/**
 * @swagger
 * /events/create:
 *   post:
 *     summary: Create a new event
 *     description: Creates a new event with title, description, location, and date of the event. User ID is automatically associated.
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The ID of the user creating the event.
 *               title:
 *                 type: string
 *                 description: The title of the event.
 *               description:
 *                 type: string
 *                 description: The description of the event.
 *               location:
 *                 type: string
 *                 description: The location where the event will take place.
 *               dateOfEvent:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time of the event.
 *     responses:
 *       200:
 *         description: Successfully created the event.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates if there is an error.
 *                 message:
 *                   type: string
 *                   description: Status message of the operation.
 *                 event:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique identifier of the created event.
 *                     title:
 *                       type: string
 *                       description: The title of the event.
 *                     description:
 *                       type: string
 *                       description: The description of the event.
 *                     location:
 *                       type: string
 *                       description: The location of the event.
 *                     dateOfEvent:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time of the event.
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates if there is an error.
 *                 message:
 *                   type: string
 *                   description: Status message of the operation.
 */

router.post("/create", postController.createEvent);

/**
 * @swagger
 * /events/update/{id}:
 *   patch:
 *     summary: Update an existing event
 *     description: Updates an event by its ID. Requires updated title, description, location, and date of the event.
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the event.
 *               description:
 *                 type: string
 *                 description: The updated description of the event.
 *               location:
 *                 type: string
 *                 description: The updated location of the event.
 *               dateOfEvent:
 *                 type: string
 *                 format: date-time
 *                 description: The updated date and time of the event.
 *     responses:
 *       200:
 *         description: Successfully updated the event.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates if there is an error.
 *                 message:
 *                   type: string
 *                   description: Status message of the operation.
 *                 updatedEvent:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique identifier of the updated event.
 *                     title:
 *                       type: string
 *                       description: The updated title of the event.
 *                     description:
 *                       type: string
 *                       description: The updated description of the event.
 *                     location:
 *                       type: string
 *                       description: The updated location of the event.
 *                     dateOfEvent:
 *                       type: string
 *                       format: date-time
 *                       description: The updated date and time of the event.
 *       400:
 *         description: Validation Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates if there is an error.
 *                 message:
 *                   type: string
 *                   description: Status message of the operation.
 *                 details:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Event not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates if there is an error.
 *                 message:
 *                   type: string
 *                   description: Status message of the operation.
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates if there is an error.
 *                 message:
 *                   type: string
 *                   description: Status message of the operation.
 */

router.post("/update/:id", postController.updateEvent);

/**
 * @swagger
 * /events/getAllEvents:
 *   get:
 *     summary: Retrieve all events with pagination
 *     description: Fetches all events with optional pagination and user details. Events are sorted by creation date in descending order.
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *           example: "1"
 *         description: The page number for pagination (default is 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *           example: "10"
 *         description: The number of events to return per page (default is 10).
 *     responses:
 *       200:
 *         description: Successfully retrieved events.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates if there is an error.
 *                 message:
 *                   type: string
 *                   description: Status message of the operation.
 *                 events:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The unique identifier of the event.
 *                       title:
 *                         type: string
 *                         description: The title of the event.
 *                       description:
 *                         type: string
 *                         description: The description of the event.
 *                       location:
 *                         type: string
 *                         description: The location of the event.
 *                       dateOfEvent:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time of the event.
 *                       userId:
 *                         type: object
 *                         properties:
 *                           fullName:
 *                             type: string
 *                             description: The full name of the user associated with the event.
 *                           email:
 *                             type: string
 *                             description: The email of the user associated with the event.
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: number
 *                       description: The current page number.
 *                     totalPages:
 *                       type: number
 *                       description: The total number of pages.
 *                     totalRecords:
 *                       type: number
 *                       description: The total number of records.
 *                     limit:
 *                       type: number
 *                       description: The number of records per page.
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates if there is an error.
 *                 message:
 *                   type: string
 *                   description: Status message of the operation.
 */

router.get("/getAllEvent", getController.getAllEvents);
/**
 * @swagger
 * /events/getOneEvent/{eventId}:
 *   get:
 *     summary: Retrieve a single event by ID
 *     description: Fetches details of a single event by its ID along with user details.
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved the event.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates if there is an error.
 *                 message:
 *                   type: string
 *                   description: Status message of the operation.
 *                 event:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique identifier of the event.
 *                     title:
 *                       type: string
 *                       description: The title of the event.
 *                     description:
 *                       type: string
 *                       description: The description of the event.
 *                     location:
 *                       type: string
 *                       description: The location of the event.
 *                     dateOfEvent:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time of the event.
 *                     userId:
 *                       type: object
 *                       properties:
 *                         fullName:
 *                           type: string
 *                           description: The full name of the user associated with the event.
 *                         email:
 *                           type: string
 *                           description: The email of the user associated with the event.
 *       400:
 *         description: Event ID is required or event not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates if there is an error.
 *                 message:
 *                   type: string
 *                   description: Status message of the operation.
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates if there is an error.
 *                 message:
 *                   type: string
 *                   description: Status message of the operation.
 */

router.get("/getOneEvent/:id", getController.getOneEvent);

/**
 * @swagger
 * /events/delete/{eventId}:
 *   delete:
 *     summary: Delete an event
 *     description: Deletes an event by its ID.
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event to delete.
 *     responses:
 *       200:
 *         description: Successfully deleted the event.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates if there is an error.
 *                 message:
 *                   type: string
 *                   description: Status message of the operation.
 *       400:
 *         description: Event not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates if there is an error.
 *                 message:
 *                   type: string
 *                   description: Status message of the operation.
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates if there is an error.
 *                 message:
 *                   type: string
 *                   description: Status message of the operation.
 */

router.get("/delete/:id", postController.deleteEvent);

export default router;
