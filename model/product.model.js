import { Schema, model } from "mongoose";

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
            maxLength: [500, "Description cannot exceed 500 characters"],
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
            type: Schema.ObjectId,
            ref: "Category",
            required: true,
        },
        images: {
            type: [String],
            required: true,
        },
        video: {
            type: String, // Optional video URL or path
        },
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
