import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { AppError } from "../utils/ApiError.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

// Ensure temporary upload directory exists
fs.mkdir("tmp/uploads", { recursive: true }).catch(console.error);

// Configure multer storage for temporary files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "tmp/uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter for images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new AppError("Not an image! Please upload only images.", 400), false);
    }
};

// Multer configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Middleware for handling single image upload
export const uploadSingleImage = upload.single("image");

// Middleware for handling multiple images upload
export const uploadMultipleImages = upload.array("images", 5); // Maximum 5 images

// Error handling middleware for multer
export const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return next(new AppError("File size too large! Maximum size is 5MB", 400));
        }
        if (err.code === "LIMIT_FILE_COUNT") {
            return next(new AppError("Too many files! Maximum is 5 images", 400));
        }
        return next(new AppError("File upload error: " + err.message, 400));
    }
    next(err);
};