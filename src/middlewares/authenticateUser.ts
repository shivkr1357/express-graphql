import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { appConfig } from "../config/app.config";
import User from "../models/user.model";

const isAuthenticated: RequestHandler = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const accessToken = req.headers.authorization.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({ error: "Unauthorized: Missing token" });
    }

    jwt.verify(
      accessToken,
      appConfig.ACCESS_TOKEN_PRIVATE_KEY,
      async (err: any, user: any) => {
        if (err) {
          return res.status(403).json({ error: "Forbidden: Invalid token" });
        }

        const userData = await User.findById(user._id);

        req.body.user = userData;
        next();
      }
    );
  }
};

export default isAuthenticated;
