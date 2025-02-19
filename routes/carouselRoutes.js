import express from "express";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";
import { uploadSingleImage, handleMulterError } from "../middlewares/uploadMiddleware.js";
import {
    getAllCarouselImages,
    createCarouselImage,
    updateCarouselImage,
    deleteCarouselImage,
    updateCarouselOrder
} from "../controller/carouselController.js";

const router = express.Router();

// Public route to get all carousel images
router.get("/", getAllCarouselImages);

// Admin only routes
router.post("/", protect, isAdmin, uploadSingleImage, handleMulterError, createCarouselImage);
router.put("/:id", protect, isAdmin, uploadSingleImage, handleMulterError, updateCarouselImage);
router.delete("/:id", protect, isAdmin, deleteCarouselImage);
router.put("/order/update", protect, isAdmin, updateCarouselOrder);

export default router;