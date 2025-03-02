import ProductModel from "../model/product.model.js";
import { catchAsyncError } from "../utils/catchAsyncErrors.js";
import { AppError } from "../utils/ApiError.js";
import slugify from "slugify";
import fs from 'fs/promises';
import mongoose from "mongoose";
import { uploadToCloudinary } from "../config/cloudinary.js";

export const createProduct = catchAsyncError(async (req, res, next) => {

    if (!req.files || !req.files.length) {
        return next(new AppError('Please upload at least one image', 400));
    }

    try {
        const uploadPromises = req.files.map(file => uploadToCloudinary(file));
        const uploadedImages = await Promise.all(uploadPromises);
        req.body.images = uploadedImages;
        req.body.slug = slugify(req.body.title);
        console.log(req.body)
        const addProduct = new ProductModel({ ...req.body, category: req.body.category });
        console.log(addProduct);

        await addProduct.save();

        // Cleanup temporary files
        await Promise.all(req.files.map(file => fs.unlink(file.path)));

        res.status(201).json({ message: "success", addProduct });
    } catch (error) {
        // Cleanup temporary files in case of error
        await Promise.all(req.files.map(file => fs.unlink(file.path).catch(() => { })));
        return next(new AppError('Error uploading images: ' + error.message, 500));
    }
});

export const getAllProducts = catchAsyncError(async (req, res, next) => {
    const {
        page = 1,
        limit = 10,
        sort = '-createdAt',
        category,
        minPrice,
        maxPrice
    } = req.query;

    // Build filter object
    const filter = {};

    // Category filter
    if (category) {
        const categoryDoc = await mongoose.model('Category').findOne({ name: { $regex: new RegExp(category, 'i') } });
        if (!categoryDoc) {
            return next(new AppError('Category not found', 404));
        }
        filter.category = categoryDoc._id;
    }

    // Price range filter
    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Calculate skip value for pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Execute query with filters and pagination
    const products = await ProductModel.find(filter)
        .populate('category')
        .sort(sort)
        .skip(skip)
        .limit(Number(limit));

    // Get total count for pagination
    const total = await ProductModel.countDocuments(filter);

    res.status(200).json({
        message: 'success',
        products,
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalProducts: total
    });
});

export const getProductById = catchAsyncError(async (req, res, next) => {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId).populate("category");
    return res.status(200).json({ message: "success", product });
});

export const updateProduct = catchAsyncError(async (req, res, next) => {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);

    if (!product) {
        return next(new AppError("Product was not found", 404));
    }

    const updateData = { ...req.body };

    if (updateData.title) {
        updateData.slug = slugify(updateData.title);
    }

    if (req.files && req.files.length > 0) {
        try {
            // Upload new images to Cloudinary
            const uploadPromises = req.files.map(file => uploadToCloudinary(file));
            const uploadedImages = await Promise.all(uploadPromises);
            
            // Combine existing images with new ones if no clear instruction to replace
            updateData.images = [...product.images, ...uploadedImages];

            // Cleanup temporary files
            await Promise.all(req.files.map(file => fs.unlink(file.path)));
        } catch (error) {
            // Cleanup temporary files in case of error
            await Promise.all(req.files.map(file => fs.unlink(file.path).catch(() => { })));
            return next(new AppError('Error uploading images: ' + error.message, 500));
        }
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
        productId, 
        updateData, 
        { new: true }
    ).populate('category');

    if (!updatedProduct) {
        return next(new AppError("Error updating product", 400));
    }

    res.status(200).json({ message: "success", updatedProduct });
});

export const deleteProduct = catchAsyncError(async (req, res, next) => {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);

    if (!product) {
        return next(new AppError("Product not found", 404));
    }

    // No need to delete images from Cloudinary as they are managed there

    await ProductModel.findByIdAndDelete(productId);
    res.status(204).json({ message: "success" });
});
