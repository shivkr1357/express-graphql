import { Router } from "express";
import getController from "../controllers/post/get.controller";
import postController from "../controllers/post/post.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API operations for post operation
 */

/**
 * @swagger
 * /posts/:
 *   get:
 *     summary: Get all posts with pagination
 *     description: Retrieve a list of all posts with comments and pagination support.
 *     tags: [Posts]
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
 *         description: Maximum number of posts per page (default is 10)
 *     responses:
 *       200:
 *         description: Successful response with a list of posts and pagination information.
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
 *                 allPostsWithComments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PostWithComments'
 *                   description: Array of posts with their associated comments.
 *                 totalPosts:
 *                   type: integer
 *                   description: Total number of posts available.
 *                 currentPage:
 *                   type: integer
 *                   description: The current page number.
 *                 totalPages:
 *                   type: integer
 *                   description: The total number of pages available based on the pagination settings.
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
router.get("/", getController.getAllPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get post by ID
 *     description: Retrieve a post by its ID along with its associated comments.
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to retrieve.
 *     responses:
 *       200:
 *         description: Successful response with the post data and associated comments.
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
 *                 postData:
 *                   $ref: '#/components/schemas/PostWithComments'
 *                   description: The retrieved post data along with its associated comments.
 *       400:
 *         description: Post not found.
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

router.get("/:id", getController.getPostById);

/**
 * @swagger
 * /posts/create:
 *   post:
 *     summary: Create a new post
 *     description: Create a new post with the provided data.
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 $ref: '#/components/schemas/User'
 *                 description: The user object associated with the post.
 *               title:
 *                 type: string
 *                 description: The title of the post.
 *               description:
 *                 type: string
 *                 description: The description of the post.
 *               image:
 *                 type: string
 *                 description: The image URL for the post.
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of tags associated with the post.
 *               postType:
 *                 type: string
 *                 enum: [text, image, video]
 *                 description: The type of post (text, image, or video).
 *     responses:
 *       200:
 *         description: Successful response with the created post data.
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
 *                 newPost:
 *                   $ref: '#/components/schemas/Post'
 *                   description: The newly created post.
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

router.post("/create", postController.createPost);

/**
 * @swagger
 * /posts/update/{postId}:
 *   patch:
 *     summary: Update a post by ID
 *     description: Update a post identified by its ID with the provided data.
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the post.
 *               description:
 *                 type: string
 *                 description: The updated description of the post.
 *               image:
 *                 type: string
 *                 description: The updated image URL for the post.
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An updated array of tags associated with the post.
 *               postType:
 *                 type: string
 *                 enum: [text, image, video]
 *                 description: The updated type of post (text, image, or video).
 *     responses:
 *       200:
 *         description: Successful response with the updated post data.
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
 *                 updatedPost:
 *                   $ref: '#/components/schemas/Post'
 *                   description: The updated post.
 *       400:
 *         description: Post not found.
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

router.patch("/update/:postId", postController.updatePost);

/**
 * @swagger
 * /posts/delete/{postId}:
 *   delete:
 *     summary: Delete a post by ID
 *     description: Delete a post identified by its ID.
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to delete.
 *     responses:
 *       200:
 *         description: Successful response indicating the post has been deleted.
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
 *         description: Post not found.
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

router.delete("/delete/:postId", postController.deletePost);

export default router;
