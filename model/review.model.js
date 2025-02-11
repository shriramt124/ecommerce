import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    productId: {
      type: Schema.ObjectId,
      ref: "Product",
      required: true, // Every review must belong to a product
    },
    userId: {
      type: Schema.ObjectId,
      ref: "User",
      required: true, // Every review must belong to a user
    },
    rating: {
      type: Number,
      required: true,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    comment: {
      type: String,
      trim: true,
      maxLength: [500, "Comment cannot exceed 500 characters"],
    },
  },
  { timestamps: true }
);

export const ReviewModel = model("Review", reviewSchema);