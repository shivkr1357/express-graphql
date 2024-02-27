import { SignInBody, UserModel } from "../types/validator";
import joi from "joi";

export const signupBodyValidate = (body: UserModel) => {
  const schema = joi.object({
    email: joi.string().email().required().label("email"),
    password: joi.string().required().label("password"),
    fullName: joi.string().required().label("fullName"),
    profilePicture: joi.string().required().label("profilePicture"),
    phone: joi.string().required().label("phone"),
  });

  return schema.validate(body);
};

export const signInBodyValidate = (body: SignInBody) => {
  const schema = joi.object({
    email: joi.string().email().required().label("email"),
    password: joi.string().required().label("password"),
  });

  return schema.validate(body);
};

export const refreshTokenBodyValidate = (body: string) => {
  const schema = joi.object({
    refreshToken: joi.string().required().label("Refresh Token"),
  });

  return schema.validate(body);
};
