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

export const createPostBodyValidate = (body: any) => {
  const schema = joi.object({
    title: joi.string().required().label("Title"),
    description: joi.string().required().label("Description"),
    image: joi.string().uri().optional().label("Image"),
    tags: joi.array().items(joi.string()).optional().label("Tags"),
    postType: joi.string().required().label("Post Type"),
    likes: joi.number().integer().min(0).optional().label("Likes"),
    comments: joi.array().items(joi.string()).optional().label("Comments"),
  });

  return schema.validate(body, { abortEarly: false });
};

export const createEventBodyValidate = (body: any) => {
  const schema = joi.object({
    title: joi.string().required().label("Title"),
    description: joi.string().required().label("Description"),
    location: joi.string().required().label("Location"),
    dateOfEvent: joi.date().iso().required().label("Date of Event"),
  });

  return schema.validate(body, { abortEarly: false });
};

export const updateEventBodyValidate = (body: any) => {
  const schema = joi.object({
    title: joi.string().optional().label("Title"),
    description: joi.string().optional().label("Description"),
    location: joi.string().optional().label("Location"),
    dateOfEvent: joi.date().iso().optional().label("Date of Event"),
  });

  return schema.validate(body, { abortEarly: false });
};
