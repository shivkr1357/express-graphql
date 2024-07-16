import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const appConfig = {
   DB_URL: "mongodb://0.0.0.0:27017/express-graphql",
   DB_USERNAME: "",
   DB_PASSWORD: "",
   ACCESS_TOKEN_PRIVATE_KEY: "newmoduleexpress",
   REFRESH_TOKEN_PRIVATE_KEY: "shivshankarkumar.pusa",
   SALT: 10,
};

export const swaggerOptions = {
   definition: {
      openapi: "3.1.0",
      info: {
         title: "New APIs for social media",
         version: "0.1.0",
         description:
            "This is the backend API of the SocialMedia application, documented using Swagger",
         license: {
            name: "MIT",
            url: "https://spdx.org/licenses/MIT.html",
         },
         contact: {
            name: "ItsIndianGuy",
            url: "https://itsindianguy.in",
            email: "shivshankarkumar.pusa@gail.com",
         },
      },
      servers: [
         {
            url: "https://0648-2401-4900-3cae-b54-4cbd-e47c-c851-4e1d.ngrok-free.app/api/v1",
         },
      ],
   },
   apis: ["./src/routes/*.ts"], // Specify the main index file that includes all routes
};

export const fileStorage = multer.diskStorage({
   destination: (
      request: Request,
      file: Express.Multer.File,
      callback: DestinationCallback
   ): void => {
      // ...Do your stuff here.
   },

   filename: (
      req: Request,
      file: Express.Multer.File,
      callback: FileNameCallback
   ): void => {
      // ...Do your stuff here.
   },
});

export const fileFilter = (
   request: Request,
   file: Express.Multer.File,
   callback: FileFilterCallback
): void => {
   if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
   ) {
      callback(null, true);
   } else {
      callback(null, false);
   }
};
