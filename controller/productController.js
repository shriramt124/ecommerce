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
        console.log(req.body, "from req.body")
        // Extract and validate accordion sections, specifications, features, and new fields
        const { accordionSections, specifications, features, keyFeatures, faq, video, isInCollection, collectionType, releaseDate, isCarouselImage, ...otherData } = req.body;

        // Create the product with all fields
        const addProduct = new ProductModel({
            ...otherData,
            category: req.body.category,
            accordionSections: accordionSections ? JSON.parse(accordionSections) : [],
            specifications: specifications ? JSON.parse(specifications) : [],
            features: features ? JSON.parse(features) : [],
            keyFeatures: keyFeatures ? JSON.parse(keyFeatures) : [],
            faq: faq ? JSON.parse(faq) : [],
            video: video || null,
            isInCollection: isInCollection === 'true' || isInCollection === true,
            isNewArrival: req.body.isNewArrival === 'true' || req.body.isNewArrival === true,
            isCarouselImage: isCarouselImage === 'true' || isCarouselImage === true,
            collectionType: collectionType || 'New',
            releaseDate: releaseDate || Date.now()
        })
        //  console.log(addProduct);

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
    //console.log(product)

    if (!product) {
        return next(new AppError("Product was not found", 404));
    }
    const { accordionSections, specifications, features, keyFeatures, faq, video, isInCollection, collectionType, releaseDate, isCarouselImage, ...otherData } = req.body;
    console.log(req.body)
    const updateData = {
        ...otherData,
        accordionSections: accordionSections ? JSON.parse(accordionSections) : undefined,
        specifications: specifications ? JSON.parse(specifications) : undefined,
        features: features ? JSON.parse(features) : undefined,
        keyFeatures: keyFeatures ? JSON.parse(keyFeatures) : undefined,
        faq: faq ? JSON.parse(faq) : undefined,
        video: video || undefined,
        isInCollection: isInCollection === 'true' || isInCollection === true ? true : false,
        isNewArrival: req.body.isNewArrival === 'true' || req.body.isNewArrival === true ? true : false,
        isCarouselImage: isCarouselImage === 'true' || isCarouselImage === true ? true : false,
        collectionType: collectionType || undefined,
        releaseDate: releaseDate || undefined
    };

    // Remove undefined fields
    Object.keys(updateData).forEach(key => {
        if (updateData[key] === undefined) {
            delete updateData[key];
        }
    });

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
