import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: [3, "Category name must be at least 3 characters long"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    }
    
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);


// Virtual field to populate subcategories
categorySchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "category",
});

// Middleware to populate products automatically
categorySchema.pre(["find", "findOne"], function () {
  this.populate("products");
});

export const CategoryModel = model("Category", categorySchema);