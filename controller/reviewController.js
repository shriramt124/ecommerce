import { ReviewModel } from "../model/review.model.js";
import { AppError } from "../utils/ApiError.js";
import { catchAsyncError } from "../utils/catchAsyncErrors.js";
import ProductModel from "../model/product.model.js";

// Helper function to update product review stats
async function updateProductReviewStats(productId) {
    const reviews = await ReviewModel.find({ productId });
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0
        ? (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews)
        : 0;

    await ProductModel.findByIdAndUpdate(productId, {
        totalReviews,
        averageRating: parseFloat(averageRating.toFixed(1))
    });
}

// Create a new review
export const createReview = catchAsyncError(async (req, res, next) => {
    const { productId, rating, comment } = req.body;
    const userId = req.user._id;

    // Check if user has already reviewed this product
    const existingReview = await ReviewModel.findOne({ productId, userId });
    if (existingReview) {
        return next(new AppError("You have already reviewed this product", 400));
    }

    const review = await ReviewModel.create({
        productId,
        userId,
        rating,
        comment
    });

    await review.populate('userId', 'FirstName LastName profileImage');
    
    // Update product review stats
    await updateProductReviewStats(productId);

    res.status(201).json({
        success: true,
        review
    });
});

// Get all reviews for a product
export const getProductReviews = catchAsyncError(async (req, res, next) => {
    const { productId } = req.params;

    const reviews = await ReviewModel.find({ productId })
        .populate('userId', 'FirstName LastName profileImage')
        .sort({ createdAt: -1 });

    const product = await ProductModel.findById(productId).select('totalReviews averageRating');

    res.status(200).json({
        success: true,
        count: product.totalReviews,
        averageRating: product.averageRating,
        reviews
    });
});

// Update a review
export const updateReview = catchAsyncError(async (req, res, next) => {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await ReviewModel.findById(reviewId);

    if (!review) {
        return next(new AppError("Review not found", 404));
    }

    // Check if the user is the owner of the review
    if (review.userId.toString() !== req.user._id.toString()) {
        return next(new AppError("You can only update your own reviews", 403));
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    await review.save();

    await review.populate('userId', 'FirstName LastName profileImage');
    
    // Update product review stats
    await updateProductReviewStats(review.productId);

    res.status(200).json({
        success: true,
        review
    });
});

// Delete a review
export const deleteReview = catchAsyncError(async (req, res, next) => {
    const { reviewId } = req.params;

    const review = await ReviewModel.findById(reviewId);

    if (!review) {
        return next(new AppError("Review not found", 404));
    }

    // Check if the user is the owner of the review
    if (review.userId.toString() !== req.user._id.toString()) {
        return next(new AppError("You can only delete your own reviews", 403));
    }

    const productId = review.productId;
    await review.deleteOne();
    
    // Update product review stats
    await updateProductReviewStats(productId);

    res.status(200).json({
        success: true,
        message: "Review deleted successfully"
    });
});