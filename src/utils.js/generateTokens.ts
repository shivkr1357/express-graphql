import jwt from "jsonwebtoken";
import UserToken from "../models/userToken.model";
import { UserModel } from "../types/validator";

const generateToken = async (user: UserModel) => {
   try {
      const payload = { _id: user._id };
      const accessToken = jwt.sign(
         payload,
         process.env.ACCESS_TOKEN_PRIVATE_KEY,
         { expiresIn: "14m" }
      );
   } catch (error) {}
};
