import User from "../model/user.model.js";
import { AppError } from "../utils/ApiError.js";
import { catchAsyncError } from "../utils/catchAsyncErrors.js";
import { uploadToCloudinary } from "../config/cloudinary.js";
import fs from 'fs/promises';
import OrderModel from "../model/order.model.js";
import ProductModel from "../model/product.model.js";


export const getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        message:"all users got successfully",
        users
    })
    

})

export const updateUser = catchAsyncError(async (req, res, next) => {
    const { _id } = req.user;
    
    try {
        // Handle profile image upload if present
        if (req.file) {
            const uploadedImage = await uploadToCloudinary(req.file);
            req.body.profileImage = uploadedImage;
            
            // Cleanup temporary file
            await fs.unlink(req.file.path);
        }

        const updateUser = await User.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updateUser) {
            return next(new AppError("User was not found", 404));
        }

        res.status(200).json({
            message: "User updated successfully",
            user: updateUser
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
})

export const deleteUser = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);
    deleteUser && res.status(204).json({ message: "User deleted successfully" });
    !deleteUser && next(new AppError("User was not found", 404));

})


export const blockUser = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const block = await User.findByIdAndUpdate(id, {
        isBlocked: true
    }, { new: true });
    
    if (!block) {
        return next(new AppError("User was not found", 404));
    }
    
    res.status(200).json({ message: "User blocked successfully", block });
})



export const unblockUser = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const unblock = await User.findByIdAndUpdate(id, {
        isBlocked: false
    }, { new: true });

    if (!unblock) {
        return next(new AppError("User was not found", 404));
    }

    res.status(200).json({
        message: "User unblocked successfully",
        unblock
    });
});

export const getDashboardStats = catchAsyncError(async (req, res, next) => {
    // Get user statistics
    console.log("it is running")
    const users = await User.find();
    const totalUsers = users.length;
    const activeUsers = users.filter(user => !user.isBlocked).length;

    // Get product statistics
    const totalProducts = await ProductModel.countDocuments();

    // Get order statistics
    const orders = await OrderModel.find();
    const totalOrders = orders.length;
    const revenue = orders.reduce((total, order) => total + (order.totalPrice || 0), 0);
 console.log("it is running")
    res.status(200).json({
        totalUsers,
        activeUsers,
        totalProducts,
        totalOrders,
        revenue
    });

});
