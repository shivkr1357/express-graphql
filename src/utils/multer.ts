import multer from "multer";
import path from "path";
import fs from "fs";

// Configure storage for Multer
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { type } = req.body;

    // Set default upload directory
    let uploadPath = "./uploads/";

    // Determine destination directory based on the type
    if (type === "post") {
      uploadPath = "./uploads/post/";
    } else if (type === "profile") {
      uploadPath = "./uploads/profile/";
    }

    // Ensure the directory exists or create it
    fs.mkdirSync(uploadPath, { recursive: true });

    // Pass the upload directory to multer
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename with timestamp and original extension
    const extname = path.extname(file.originalname);
    const basename = path
      .basename(file.originalname, extname)
      .toLowerCase()
      .replace(/\s+/g, "");
    const filename = `${basename}_${Date.now()}${extname}`;

    // Pass the generated filename to multer
    cb(null, filename);
  },
});

// File filter to allow only certain image types
export const fileFilter = (req: any, file: any, cb: any) => {
  // Allow only jpg, jpeg, and png files
  if (["image/jpg", "image/jpeg", "image/png"].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
  }
};
