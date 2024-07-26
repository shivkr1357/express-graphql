import { Router } from "express";
import postController from "../controllers/auth/post.controller";
import updateController from "../controllers/auth/update.controller";
import verifyRefreshToken from "../utils/verifyRefreshToken";
import isAuthenticated from "../middlewares/authenticateUser";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API operations for user authentication
 */

/**
 * @swagger
 * /auth/:
 *   post:
 *     summary: User Sign In
 *     description: Authenticate and log in a user with email and password.
 *     tags: [Authentication]
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
 *                 description: The email address of the user for authentication.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password of the user for authentication.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: User logged in successfully. Returns access and refresh tokens.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates whether an error occurred.
 *                 accessToken:
 *                   type: string
 *                   description: The access token for the authenticated user.
 *                 refreshToken:
 *                   type: string
 *                   description: The refresh token for the authenticated user.
 *                 message:
 *                   type: string
 *                   description: A message indicating successful user login.
 *       '400':
 *         description: Bad request. Indicates validation error in the request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates whether an error occurred.
 *                 message:
 *                   type: string
 *                   description: Error message indicating validation error.
 *       '401':
 *         description: Unauthorized. Indicates user not found or invalid password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates whether an error occurred.
 *                 message:
 *                   type: string
 *                   description: Error message indicating user not found or invalid password.
 *       '500':
 *         description: Internal server error. Indicates an unexpected server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates whether an error occurred.
 *                 message:
 *                   type: string
 *                   description: Error message indicating an internal server error.
 */

router.post("/", postController.SignIn);

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API operations for user authentication
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User Signup
 *     description: Create a new user account.
 *     tags: [Authentication]
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
 *                 description: The email address for the new user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password for the new user.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: User account created successfully. Indicates successful account creation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates whether an error occurred.
 *                 message:
 *                   type: string
 *                   description: A message indicating successful account creation.
 *       '400':
 *         description: Bad request. Indicates validation error in the request body or user already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates whether an error occurred.
 *                 message:
 *                   type: string
 *                   description: Error message indicating validation error or existing user.
 *       '500':
 *         description: Internal server error. Indicates an unexpected server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates whether an error occurred.
 *                 message:
 *                   type: string
 *                   description: Error message indicating an internal server error.
 */
router.post("/signUp", postController.SignUp);

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API operations for user authentication
 */

/**
 * @swagger
 * /auth/verify-token:
 *   post:
 *     summary: Verify Token and Generate Access Token
 *     description: Verify the provided token and generate a new access token.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tokenDetails:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The user ID extracted from the provided token details.
 *                 required:
 *                   - _id
 *             required:
 *               - tokenDetails
 *     responses:
 *       '200':
 *         description: Access token created successfully. Indicates successful token verification.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates whether an error occurred.
 *                 accessToken:
 *                   type: string
 *                   description: The newly generated access token.
 *                 message:
 *                   type: string
 *                   description: A message indicating successful access token creation.
 *       '500':
 *         description: Internal server error. Indicates an unexpected server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates whether an error occurred.
 *                 message:
 *                   type: string
 *                   description: Error message indicating an internal server error.
 */
router.post("/verifyToken", verifyRefreshToken, postController.verifyToken);
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API operations for user authentication
 */

/**
 * @swagger
 * /auth/logout:
 *   delete:
 *     summary: Logout user
 *     description: Logout user by invalidating the provided refresh token.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token to invalidate and log the user out.
 *     responses:
 *       '200':
 *         description: User logged out successfully. Indicates successful logout.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates whether an error occurred.
 *                 message:
 *                   type: string
 *                   description: A message indicating successful logout.
 *       '400':
 *         description: Bad request. Indicates validation error in the request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates whether an error occurred.
 *                 message:
 *                   type: string
 *                   description: Error message indicating validation error.
 *       '500':
 *         description: Internal server error. Indicates an unexpected server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates whether an error occurred.
 *                 message:
 *                   type: string
 *                   description: Error message indicating an internal server error.
 */
router.delete("/logout", isAuthenticated, postController.logout);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API operations for Updating the user data
 */

/**
 * @swagger
 * /auth/updateUser/{userId}:
 *   patch:
 *     summary: Update a user by ID
 *     description: Update user details based on the provided user ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userFields:
 *                 type: object
 *                 description: The fields to update in the user.
 *     responses:
 *       '200':
 *         description: Successful update. Returns the updated user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates whether an error occurred.
 *                 updatedUser:
 *                   type: object
 *                   description: The updated user details.
 *                 message:
 *                   type: string
 *                   description: A message indicating the success.
 *       '400':
 *         description: User not found. Indicates that the specified user ID was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates whether an error occurred.
 *                 message:
 *                   type: string
 *                   description: Error message indicating user not found.
 *       '500':
 *         description: Internal server error. Indicates an unexpected server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates whether an error occurred.
 *                 message:
 *                   type: string
 *                   description: Error message indicating an internal server error.
 */
router.patch("/updateUser/:userId", updateController.updateUser);

export default router;
