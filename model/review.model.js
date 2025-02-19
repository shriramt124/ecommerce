import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
    {
        productId: {
            type: Schema.ObjectId,
            ref: "Product",
            required: true, // Every review must belong to a product
            index: true // Add index for faster queries
        },
        userId: {
            type: Schema.ObjectId,
            ref: "user", // Fix reference to match user model collection name
            required: true, // Every review must belong to a user
            index: true // Add index for faster queries
        },
        rating: {
            type: Number,
            required: true,
            min: [1, "Rating must be at least 1"],
            max: [5, "Rating cannot exceed 5"],
            index: true // Add index for rating-based queries
        },
        comment: {
            type: String,
            trim: true,
            maxLength: [500, "Comment cannot exceed 500 characters"],
        },
        verifiedPurchase: {
            type: Boolean,
            default: false,
            index: true // Add index for filtering verified reviews
        }
    },
    { timestamps: true }
);

export const ReviewModel = model("Review", reviewSchema);
