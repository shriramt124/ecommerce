import ProductModel from "../model/product.model.js";
import { catchAsyncError } from "../utils/catchAsyncErrors.js";
import { AppError } from "../utils/ApiError.js";
import slugify from "slugify";
import fs from 'fs/promises';
 
export const createProduct = catchAsyncError(async (req, res, next) => {
    if (!req.files || !req.files.length) {
        return next(new AppError('Please upload at least one image', 400));
    }
    try {
        const uploadPromises = req.files.map(file => uploadToCloudinary(file));
        const uploadedImages = await Promise.all(uploadPromises);
        req.body.images = uploadedImages;
        req.body.slug = slugify(req.body.title);

        const addProduct = new ProductModel(req.body);
        await addProduct.save();

        // Cleanup temporary files
        await Promise.all(req.files.map(file => fs.unlink(file.path)));

        res.status(201).json({ message: "success", addProduct });
    } catch (error) {
        // Cleanup temporary files in case of error
        await Promise.all(req.files.map(file => fs.unlink(file.path).catch(() => {})));
        return next(new AppError('Error uploading images: ' + error.message, 500));
    }
});

export const getAllProducts = catchAsyncError(async (req, res, next) => {
    const products = await ProductModel.find().populate("category");
    res.status(200).json({ message: "success", products });
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

    if (req.body.title) {
        req.body.slug = slugify(req.body.title);
    } 

    if (req.files && req.files.length > 0) {
        try {
            // Upload new images to Cloudinary
            const uploadPromises = req.files.map(file => uploadToCloudinary(file));
            const uploadedImages = await Promise.all(uploadPromises);
            req.body.images = uploadedImages;

            // Cleanup temporary files
            await Promise.all(req.files.map(file => fs.unlink(file.path)));
        } catch (error) {
            // Cleanup temporary files in case of error
            await Promise.all(req.files.map(file => fs.unlink(file.path).catch(() => {})));
            return next(new AppError('Error uploading images: ' + error.message, 500));
        }
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(productId, req.body, {
        new: true
    });

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
