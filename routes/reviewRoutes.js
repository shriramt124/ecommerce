import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createReview, deleteReview, getProductReviews, updateReview } from "../controller/reviewController.js";

const router = express.Router();

// Create a new review
router.post("/", protect, createReview);

// Get all reviews for a product
router.get("/product/:productId", getProductReviews);

// Update a review
router.put("/:reviewId", protect, updateReview);

// Delete a review
router.delete("/:reviewId", protect, deleteReview);

export default router;