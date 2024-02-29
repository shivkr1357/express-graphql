import multer from "multer";

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { type } = req.body;

    let uploadPath = "./uploads/";

    // Determine destination directory based on type
    //  if (type === "post") {
    //    uploadPath = "./uploads/post/";
    //  } else if (type === "profile") {
    //    uploadPath = "./uploads/profile/";
    //  }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const date = new Date();
    cb(null, file.originalname);
  },
});
export const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
  }
};
