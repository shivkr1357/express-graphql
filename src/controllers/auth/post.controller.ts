import { RequestHandler } from "express";
import {
   signInBodyValidate,
   signupBodyValidate,
} from "../../utils.js/validations";
import User from "../../models/user.model";
import bcrypt from "bcrypt";

const SignUp: RequestHandler = async (req, res) => {
   const { error } = signupBodyValidate(req.body);

   if (error) {
      return res
         .status(400)
         .json({ error: true, message: error.details[0].message });
   }

   const user = await User.findOne({ email: req.body.email });

   if (user) {
      return res
         .status(400)
         .json({ error: true, message: "User already exist , please login" });
   }

   const salt = await bcrypt.genSalt(Number(process.env.SALT));
   const hashPassword = await bcrypt.hash(req.body.password, salt);

   await new User({ ...req.body, password: hashPassword }).save();

   res.status(201).json({
      error: false,
      message: "Account created successfully",
   });
};

const SignIn: RequestHandler = async (req, res) => {
   const { error } = signInBodyValidate(req.body);

   if (error) {
      return res
         .status(400)
         .json({ error: true, message: error.details[0].message });
   }

   const user = await User.findOne({ email: req.body.email });

   if (!user) {
      return res.status(401).json({
         error: true,
         message: "User does not exist with this email",
      });
   }

   const verifiedPassword = await bcrypt.compare(
      req.body.password,
      user.password
   );

   if (!verifiedPassword) {
      return res.status(401).json({ error: true, message: "Invalid Password" });
   }
};

export default { SignUp, SignIn };
