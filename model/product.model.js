import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minLength: [3, "Title must be at least 3 characters long"],
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
            minLength: [10, "Description must be at least 10 characters long"],
            maxLength: [1000, "Description cannot exceed 1000 characters"],
        },
        price: {
            type: Number,
            required: true,
            min: [0, "Price cannot be negative"],
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
            min: [0, "Quantity cannot be negative"],
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        images: {
            type: [String],
            required: true,
        },
        keyFeatures: [{
            feature: {
                type: String,
                required: true,
                trim: true
            }
        }],
        faq: [{
            question: {
                type: String,
                required: true,
                trim: true
            },
            answer: {
                type: String,
                required: true,
                trim: true
            }
        }],
        averageRating: {
            type: Number,
            default: 0,
            min: [0, "Average rating cannot be negative"],
            max: [5, "Average rating cannot exceed 5"]
        },
        totalReviews: {
            type: Number,
            default: 0,
            min: [0, "Total reviews cannot be negative"]
        },
        video: {
            type: String
        },
        isNewArrival: {
            type: Boolean,
            default: false
        },
        isInCollection: {
            type: Boolean,
            default: false
        },
        collectionType: {
            type: String,
            enum: ['New', 'Limited', 'Bestseller'],
            default: 'New'
        },
        releaseDate: {
            type: Date,
            default: Date.now
        },
        isCarouselImage: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual field for reviews (optional)
productSchema.virtual("reviews", {
    ref: "Review",
    localField: "_id",
    foreignField: "productId",
});

// Middleware to populate reviews only if needed
productSchema.pre(["find", "findOne"], function () {
    if (this._userProvidedFields && this._userProvidedFields.reviews) {
        this.populate("reviews");
    }
});

const ProductModel = model("Product", productSchema);
export default ProductModel;
