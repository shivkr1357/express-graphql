import { RequestHandler } from "express";
import { appConfig } from "../config/app.config";
import UserToken from "../models/userToken.model";
import jwt from "jsonwebtoken";

const verifyRefreshToken: RequestHandler = async (req, res, next) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ error: true, message: "Refresh token not provided" });
  }

  try {
    const token = await UserToken.findOne({ token: refreshToken });

    if (!token) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid Refresh token" });
    }

    jwt.verify(
      refreshToken,
      appConfig.REFRESH_TOKEN_PRIVATE_KEY,
      (err: any, tokenDetails: any) => {
        if (err) {
          return res
            .status(401)
            .json({ error: true, message: "Invalid Refresh token" });
        }

        req.body.tokenDetails = tokenDetails;
        next();
      }
    );
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

export default verifyRefreshToken;
