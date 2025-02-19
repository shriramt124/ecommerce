import CarouselModel from "../model/carousel.model.js";
import { AppError } from "../utils/ApiError.js";
import { catchAsyncError } from "../utils/catchAsyncErrors.js";
import { uploadToCloudinary } from "../config/cloudinary.js";
import fs from 'fs/promises';

// Get all carousel images
export const getAllCarouselImages = catchAsyncError(async (req, res) => {
    const carouselImages = await CarouselModel.find()
        .sort({ order: 1 })
        .populate('createdBy', 'FirstName LastName');

    res.status(200).json({
        success: true,
        carouselImages
    });
});

// Create new carousel image
export const createCarouselImage = catchAsyncError(async (req, res, next) => {
    if (!req.file) {
        return next(new AppError("Please upload an image", 400));
    }

    try {
        // Upload image to Cloudinary
        const uploadedImage = await uploadToCloudinary(req.file);
        
        // Create carousel entry
        const carouselImage = await CarouselModel.create({
            imageUrl: uploadedImage,
            title: req.body.title,
            description: req.body.description,
            order: req.body.order,
            createdBy: req.user._id
        });

        // Cleanup temporary file
        await fs.unlink(req.file.path);

        res.status(201).json({
            success: true,
            carouselImage
        });
    } catch (error) {
        if (req.file) {
            await fs.unlink(req.file.path);
        }
        throw error;
    }
});

// Update carousel image
export const updateCarouselImage = catchAsyncError(async (req, res, next) => {
    const carouselImage = await CarouselModel.findById(req.params.id);

    if (!carouselImage) {
        return next(new AppError("Carousel image not found", 404));
    }

    try {
        // Handle new image upload if present
        if (req.file) {
            const uploadedImage = await uploadToCloudinary(req.file);
            req.body.imageUrl = uploadedImage;
            await fs.unlink(req.file.path);
        }

        const updatedCarousel = await CarouselModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('createdBy', 'FirstName LastName');

        res.status(200).json({
            success: true,
            carouselImage: updatedCarousel
        });
    } catch (error) {
        if (req.file) {
            await fs.unlink(req.file.path);
        }
        throw error;
    }
});

// Delete carousel image
export const deleteCarouselImage = catchAsyncError(async (req, res, next) => {
    const carouselImage = await CarouselModel.findById(req.params.id);

    if (!carouselImage) {
        return next(new AppError("Carousel image not found", 404));
    }

    await carouselImage.deleteOne();

    res.status(200).json({
        success: true,
        message: "Carousel image deleted successfully"
    });
});

// Update carousel image order
export const updateCarouselOrder = catchAsyncError(async (req, res) => {
    const { orders } = req.body; // Array of { id, order }

    // Update each carousel image's order
    await Promise.all(
        orders.map(({ id, order }) =>
            CarouselModel.findByIdAndUpdate(id, { order })
        )
    );

    const updatedCarousel = await CarouselModel.find()
        .sort({ order: 1 })
        .populate('createdBy', 'FirstName LastName');

    res.status(200).json({
        success: true,
        carouselImages: updatedCarousel
    });
});