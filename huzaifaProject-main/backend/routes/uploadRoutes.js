import path from "path";
import express from "express";
import multer from "multer";
import fs from "fs";

const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Use absolute path
    const uploadPath = path.join(process.cwd(), "uploads");
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  console.log("Upload request received");
  console.log("Upload directory:", path.join(process.cwd(), "uploads"));
  console.log("Content-Type:", req.headers["content-type"]); // Check content-type

  uploadSingleImage(req, res, (err) => {
    console.log("Raw request body:", req.body);
    console.log("Files in request:", req.files);
    console.log("Single file in request:", req.file);

    // Debug FormData
    if (req.headers["content-type"]?.includes("multipart/form-data")) {
      console.log("Received multipart form data");
    }

    if (err) {
      console.error("Upload error details:", err);
      return res.status(400).send({ message: err.message });
    }

    if (!req.file) {
      console.log("File missing in request");
      return res.status(400).send({ message: "No image file provided" });
    }

    try {
      // Normalize path for URL
      const relativePath = path.relative(process.cwd(), req.file.path);
      const normalizedPath = "/" + relativePath.replace(/\\/g, "/");

      console.log("File saved at:", normalizedPath);

      res.status(200).send({
        message: "Image uploaded successfully",
        image: normalizedPath,
      });
    } catch (error) {
      console.error("Path processing error:", error);
      res.status(500).send({ message: "Error processing upload path" });
    }
  });
});

export default router;
