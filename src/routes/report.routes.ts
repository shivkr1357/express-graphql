import { Router } from "express";
import postController from "../controllers/reports/post.controller";
import getController from "../controllers/reports/get.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: API operations for Event actions
 */

/**
 * @swagger
 * /reports/create:
 *   post:
 *     summary: Create a new report
 *     description: Creates a new report associated with a post and a user. Requires report content, post ID, and user ID.
 *     tags: [Reports]
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
 *                     description: The ID of the user creating the report.
 *               content:
 *                 type: string
 *                 description: The content of the report.
 *               postId:
 *                 type: string
 *                 description: The ID of the post being reported.
 *     responses:
 *       200:
 *         description: Successfully created the report.
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
 *                 report:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique identifier of the created report.
 *                     content:
 *                       type: string
 *                       description: The content of the report.
 *                     postId:
 *                       type: string
 *                       description: The ID of the post being reported.
 *                     ReporterUserId:
 *                       type: string
 *                       description: The ID of the user who created the report.
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

router.post("/create", postController.createReport);

/**
 * @swagger
 * /reports/update/{id}:
 *   patch:
 *     summary: Update an existing report
 *     description: Updates an existing report by its ID. Requires updated content and post ID.
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the report to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The updated content of the report.
 *               postId:
 *                 type: string
 *                 description: The updated ID of the post being reported.
 *     responses:
 *       200:
 *         description: Successfully updated the report.
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
 *                 report:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique identifier of the updated report.
 *                     content:
 *                       type: string
 *                       description: The updated content of the report.
 *                     postId:
 *                       type: string
 *                       description: The updated ID of the post being reported.
 *       404:
 *         description: Report not found.
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

router.post("/update/:id", postController.updateReport);

/**
 * @swagger
 * /reports/getAllReports:
 *   get:
 *     summary: Retrieve all reports with pagination
 *     description: Fetches all reports with optional pagination and user details. Reports are sorted by creation date in descending order.
 *     tags: [Reports]
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
 *         description: The number of reports to return per page (default is 10).
 *     responses:
 *       200:
 *         description: Successfully retrieved reports.
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
 *                 reports:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The unique identifier of the report.
 *                       content:
 *                         type: string
 *                         description: The content of the report.
 *                       postId:
 *                         type: string
 *                         description: The ID of the post being reported.
 *                       ReporterUserId:
 *                         type: object
 *                         properties:
 *                           fullName:
 *                             type: string
 *                             description: The full name of the user who created the report.
 *                           email:
 *                             type: string
 *                             description: The email of the user who created the report.
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

router.get("/getAllReports", getController.getAllReports);

/**
 * @swagger
 * /reports/getOneReport/{id}:
 *   get:
 *     summary: Retrieve a single report by ID
 *     description: Fetches a specific report by its ID, including details of the associated post and reporting user.
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the report to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved the report.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates if there is an error.
 *                 report:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique identifier of the report.
 *                     content:
 *                       type: string
 *                       description: The content of the report.
 *                     postId:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: The ID of the post.
 *                         title:
 *                           type: string
 *                           description: The title of the post.
 *                     ReporterUserId:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: The ID of the user who created the report.
 *                         fullName:
 *                           type: string
 *                           description: The full name of the user.
 *                         email:
 *                           type: string
 *                           description: The email of the user.
 *       404:
 *         description: Report not found.
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

router.get("/getOneReport/:id", getController.getReport);

/**
 * @swagger
 * /reports/delete/{id}:
 *   delete:
 *     summary: Delete a report
 *     description: Deletes a specific report by its ID.
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the report to delete.
 *     responses:
 *       200:
 *         description: Successfully deleted the report.
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
 *         description: Report not found.
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

router.get("/delete/:id", postController.deleteReport);

export default router;
