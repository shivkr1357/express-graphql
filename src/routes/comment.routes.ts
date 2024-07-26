import { Router } from "express";
import postController from "../controllers/comment/post.controller";
import getController from "../controllers/comment/get.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API operations for comments actions
 */

/**
 * @swagger
 * /comments/create:
 *   post:
 *     summary: Add a comment to a post
 *     description: Adds a new comment to a specified post.
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The content of the comment.
 *               postId:
 *                 type: string
 *                 description: The ID of the post to which the comment is being added.
 *               userId:
 *                 type: string
 *                 description: The ID of the user making the comment.
 *             required:
 *               - comment
 *               - postId
 *               - userId
 *     responses:
 *       200:
 *         description: Successful response indicating the comment was added.
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
 *                   description: Indicates the status of the operation.
 *       400:
 *         description: Bad request, comment field cannot be empty.
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
 *                   description: Indicates the status of the operation.
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
 *                   description: Indicates the status of the operation.
 */

router.post("/create", postController.addComment);

/**
 * @swagger
 * /comments/getAllComments:
 *   get:
 *     summary: Retrieve all comments with pagination
 *     description: Fetches a paginated list of all comments, including details about associated posts and users.
 *     tags: [Comments]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of comments to retrieve per page.
 *     responses:
 *       200:
 *         description: Successful response with the list of comments.
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
 *                   description: Indicates the status of the operation.
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       comment:
 *                         type: string
 *                         description: The content of the comment.
 *                       postId:
 *                         type: object
 *                         properties:
 *                           title:
 *                             type: string
 *                             description: The title of the associated post.
 *                       userId:
 *                         type: object
 *                         properties:
 *                           fullName:
 *                             type: string
 *                             description: The full name of the user who made the comment.
 *                           email:
 *                             type: string
 *                             description: The email of the user who made the comment.
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
 *                   description: Indicates the status of the operation.
 */

router.get("/getAllComments", getController.getAllComments);

/**
 * @swagger
 * /comments/likeComment:
 *   post:
 *     summary: Like a comment
 *     description: Adds a user ID to the list of likes for a specified comment.
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user who likes the comment.
 *               commentId:
 *                 type: string
 *                 description: The ID of the comment being liked.
 *             required:
 *               - userId
 *               - commentId
 *     responses:
 *       200:
 *         description: Successful response indicating the comment was liked.
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
 *                   description: Indicates the status of the operation.
 *       400:
 *         description: Bad request, either the user ID is missing or the comment was not found.
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
 *                   description: Indicates the status of the operation.
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
 *                   description: Indicates the status of the operation.
 */

router.post("/likeComment", postController.likeComment);

/**
 * @swagger
 * /comments/getCommentById/{commentId}:
 *   get:
 *     summary: Retrieve a comment by its ID
 *     description: Fetches a single comment by its ID.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to retrieve.
 *     responses:
 *       200:
 *         description: Successful response with the requested comment.
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
 *                   description: Indicates the status of the operation.
 *                 comment:
 *                   type: object
 *                   properties:
 *                     comment:
 *                       type: string
 *                       description: The content of the comment.
 *                     postId:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                           description: The title of the associated post.
 *                     userId:
 *                       type: object
 *                       properties:
 *                         fullName:
 *                           type: string
 *                           description: The full name of the user who made the comment.
 *                         email:
 *                           type: string
 *                           description: The email of the user who made the comment.
 *       400:
 *         description: Bad request, comment ID is missing.
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
 *                   description: Indicates the status of the operation.
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
 *                   description: Indicates the status of the operation.
 */

router.get("/getCommentById/:commentId", getController.getCommentById);

/**
 * @swagger
 * /comments/update/{commentId}:
 *   patch:
 *     summary: Update a comment by its ID
 *     description: Updates the content of a comment specified by its ID.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The new content of the comment.
 *             required:
 *               - comment
 *     responses:
 *       200:
 *         description: Successful response indicating the comment was updated.
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
 *                   description: Indicates the status of the operation.
 *                 comment:
 *                   type: object
 *                   properties:
 *                     comment:
 *                       type: string
 *                       description: The updated content of the comment.
 *                     postId:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                           description: The title of the associated post.
 *                     userId:
 *                       type: object
 *                       properties:
 *                         fullName:
 *                           type: string
 *                           description: The full name of the user who made the comment.
 *                         email:
 *                           type: string
 *                           description: The email of the user who made the comment.
 *       400:
 *         description: Bad request, either the comment ID or the comment content is missing.
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
 *                   description: Indicates the status of the operation.
 *       404:
 *         description: Comment not found with the provided ID.
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
 *                   description: Indicates the status of the operation.
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
 *                   description: Indicates the status of the operation.
 */

router.patch("/update/:commentId", postController.updateComment);

/**
 * @swagger
 * /comments/delete/{commentId}:
 *   delete:
 *     summary: Delete a comment by its ID
 *     description: Deletes a comment specified by its ID.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to delete.
 *     responses:
 *       200:
 *         description: Successful response indicating the comment was deleted.
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
 *                   description: Indicates the status of the operation.
 *       400:
 *         description: Bad request, comment ID is missing or error deleting the comment.
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
 *                   description: Indicates the status of the operation.
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
 *                   description: Indicates the status of the operation.
 */

router.delete("/delete/:commentId", postController.deleteComment);

export default router;
