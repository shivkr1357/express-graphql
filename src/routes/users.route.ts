import { Router } from "express";
import { getController, postController } from "../controllers/users";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API operations for retriving only one user data
 */

/**
 * @swagger
 * /users/getOneUser/{userId}:
 *   get:
 *     summary: Get User Data
 *     description: Retrieve user data based on the provided email address.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user to retrieve data.
 *             required:
 *               - email
 *     responses:
 *       '200':
 *         description: User data retrieved successfully. Returns the user data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating successful user data retrieval.
 *                 user:
 *                   type: object
 *                   description: The user object containing retrieved user data.
 *       '400':
 *         description: Bad request. Indicates missing email in the request body or user not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating missing email or user not found.
 *       '500':
 *         description: Internal server error. Indicates an unexpected server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating an internal server error.
 */

router.get("/getOneUser/:email", getController.getOneUserData);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API operations for retriving only one user data
 */

/**
 * @swagger
 * /users/getAllUsers:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users with pagination support.
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of users per page (default is 10)
 *     responses:
 *       200:
 *         description: Successful response with a list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Indicates the status of the operation.
 *                 error:
 *                   type: boolean
 *                   description: Indicates if there is an error.
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       400:
 *         description: No users found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Indicates the status of the operation.
 *                 error:
 *                   type: boolean
 *                   description: Indicates if there is an error.
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Indicates the status of the operation.
 *                 error:
 *                   type: boolean
 *                   description: Indicates if there is an error.
 */

router.get("/getAllUsers", getController.getAllUser);

router.patch("/blockUser/:blockId", postController.blockUser);

export default router;
