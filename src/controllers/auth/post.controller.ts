import { RequestHandler } from "express";
import {
   refreshTokenBodyValidate,
   signInBodyValidate,
   signupBodyValidate,
} from "../../utils.js/validations";
import User from "../../models/user.model";
import bcrypt from "bcrypt";
import generateToken from "../../utils.js/generateTokens";
import jwt from "jsonwebtoken";
import { appConfig } from "../../config/app.config";
import UserToken from "../../models/userToken.model";

const SignUp: RequestHandler = async (req, res) => {
   const { error } = signupBodyValidate(req.body);

   // Check if there is any error in validation of the data

   if (error) {
      return res
         .status(400)
         .json({ error: true, message: error.details[0].message });
   }

   const user = await User.findOne({ email: req.body.email });

   // Check if the user exists or not with the provided email

   if (user) {
      return res
         .status(400)
         .json({ error: true, message: "User already exist , please login" });
   }

   // generate hashed password
   const salt = await bcrypt.genSalt(Number(process.env.SALT));
   const hashPassword = await bcrypt.hash(req.body.password, salt);

   //save the user along with hashed password

   await new User({ ...req.body, password: hashPassword }).save();

   res.status(201).json({
      error: false,
      message: "Account created successfully",
   });
};

const SignIn: RequestHandler = async (req, res) => {
   const { error } = signInBodyValidate(req.body);

   try {
      // check if there is any unwanted data in the body

      if (error) {
         return res
            .status(400)
            .json({ error: true, message: error.details[0].message });
      }

      // Find one user using the unique email
      const user = await User.findOne({ email: req.body.email });

      // if user not found return
      if (!user) {
         return res.status(401).json({
            error: true,
            message: "User does not exist with this email",
         });
      }

      // verify the hashed password

      const verifiedPassword = await bcrypt.compare(
         req.body.password,
         user.password
      );

      if (!verifiedPassword) {
         return res
            .status(401)
            .json({ error: true, message: "Invalid Password" });
      }

      // generate access token and refresh token
      const { accessToken, refreshToken } = await generateToken(user);

      return res.status(200).json({
         error: false,
         accessToken,
         refreshToken,
         message: "User Logged In successfully",
      });
   } catch (error) {}
};

const verifyToken: RequestHandler = async (req, res) => {
   try {
      const payload = { _id: req.body.tokenDetails._id };

      const accessToken = jwt.sign(
         payload,
         appConfig.ACCESS_TOKEN_PRIVATE_KEY,
         {
            expiresIn: "14m",
         }
      );

      res.status(200).json({
         error: false,
         accessToken,
         message: "Access token created successfully",
      });
   } catch (error) {
      return res
         .status(500)
         .json({ error: true, message: "Internal Server Error from here" });
   }
};
/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         author:
 *           type: string
 *           description: The book author
 *         finished:
 *           type: boolean
 *           description: Whether you have finished reading the book
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

const logout: RequestHandler = async (req, res) => {
   try {
      const { error } = refreshTokenBodyValidate(req.body);

      if (error)
         return res
            .status(400)
            .json({ error: true, message: error.details[0].message });

      const userToken = await UserToken.findOne({
         token: req.body.refreshToken,
      });

      if (!userToken)
         return res
            .status(200)
            .json({ error: false, message: "Logged Out successfully" });

      await userToken.deleteOne();

      res.status(200).json({
         error: false,
         message: "User Logged Out successfully",
      });
   } catch (error) {
      res.status(500).json({ error: true, message: "Internal server error " });
   }
};

export default { SignUp, SignIn, verifyToken, logout };
