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
            "This is backend API of SocialMedia application which is documented using Swagger",
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
            url: "http://localhost:4000/api/v1",
         },
      ],
   },
   apis: ["../routes/*.ts"],
};
