import jwt from "jsonwebtoken";
import UserToken from "../models/userToken.model";
import { appConfig } from "../config/app.config";

const generateToken = async (user: any) => {
  try {
    const payload = { _id: user._id };
    const accessToken = jwt.sign(payload, appConfig.ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: "14m",
    });

    const refreshToken = jwt.sign(
      payload,
      appConfig.REFRESH_TOKEN_PRIVATE_KEY,
      {
        expiresIn: "30d",
      }
    );

    const userToken = await UserToken.findOne({ userId: user._id });

    if (userToken) {
      await userToken.deleteOne();
    }

    await new UserToken({ userId: user._id, token: refreshToken }).save();

    return Promise.resolve({ accessToken, refreshToken });
  } catch (error) {
    console.log("Error ", error);
    return Promise.reject(error);
  }
};

export default generateToken;
