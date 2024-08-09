import { Router } from "express";
import getController from "../controllers/suggestions/get.controller";
import postController from "../controllers/suggestions/post.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Suggestions
 *     description: API endpoints related to suggestions.
 */

/**
 * @swagger
 * /suggestions/getAllSuggestions:
 *   get:
 *     summary: Retrieve all suggestions with pagination
 *     description: Fetches all suggestions with optional pagination and user details. Suggestions are sorted by creation date in descending order.
 *     tags: [Suggestions]
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
 *         description: The number of suggestions to return per page (default is 10).
 *     responses:
 *       200:
 *         description: Successfully retrieved suggestions.
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
 *                 suggestions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The unique identifier of the suggestion.
 *                       text:
 *                         type: string
 *                         description: The text of the suggestion.
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time when the suggestion was created.
 *                       userId:
 *                         type: object
 *                         properties:
 *                           fullName:
 *                             type: string
 *                             description: The full name of the user who made the suggestion.
 *                           email:
 *                             type: string
 *                             description: The email of the user who made the suggestion.
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
router.get("/getAllSuggestions", getController.getAllSuggestions);

/**
 * @swagger
 * /suggestions/create:
 *   post:
 *     summary: Create a new suggestion
 *     description: Creates a new suggestion and associates it with a user. Requires user details and suggestion text.
 *     tags: [Suggestions]
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
 *                     description: The ID of the user creating the suggestion.
 *               suggestions:
 *                 type: string
 *                 description: The text of the suggestion.
 *     responses:
 *       200:
 *         description: Successfully created the suggestion.
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
 *                 suggestion:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique identifier of the created suggestion.
 *                     suggestions:
 *                       type: string
 *                       description: The text of the suggestion.
 *                     userId:
 *                       type: string
 *                       description: The ID of the user who created the suggestion.
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
router.post("/create", postController.createSuggestion);

/**
 * @swagger
 * /suggestions/update/{id}:
 *   patch:
 *     summary: Update an existing suggestion
 *     description: Updates an existing suggestion by its ID. Requires the suggestion text to update.
 *     tags: [Suggestions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the suggestion to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               suggestions:
 *                 type: string
 *                 description: The updated text of the suggestion.
 *     responses:
 *       200:
 *         description: Successfully updated the suggestion.
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
 *                 suggestion:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique identifier of the updated suggestion.
 *                     suggestions:
 *                       type: string
 *                       description: The updated text of the suggestion.
 *       404:
 *         description: Suggestion not found.
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
router.patch("/update/:id", postController.updateSuggestion);

/**
 * @swagger
 * /suggestions/delete/{id}:
 *   delete:
 *     summary: Delete a suggestion
 *     description: Deletes a specific suggestion by its ID.
 *     tags: [Suggestions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the suggestion to delete.
 *     responses:
 *       200:
 *         description: Successfully deleted the suggestion.
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
 *       404:
 *         description: Suggestion not found.
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
router.delete("/delete/:id", postController.deleteSuggestion);

/**
 * @swagger
 * /suggestions/getOneSuggestion/{id}:
 *   get:
 *     summary: Retrieve a single suggestion by ID
 *     description: Fetches a specific suggestion by its ID, including user details.
 *     tags: [Suggestions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the suggestion to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved the suggestion.
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
 *                 suggestion:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique identifier of the suggestion.
 *                     text:
 *                       type: string
 *                       description: The text of the suggestion.
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time when the suggestion was created.
 *                     userId:
 *                       type: object
 *                       properties:
 *                         fullName:
 *                           type: string
 *                           description: The full name of the user who made the suggestion.
 *                         email:
 *                           type: string
 *                           description: The email of the user who made the suggestion.
 *       400:
 *         description: Bad request, suggestion ID is required or not found.
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
router.get("/getOneSuggestion/:id", getController.getOneSuggestion);

export default router;
