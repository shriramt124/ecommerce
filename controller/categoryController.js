import { CategoryModel } from "../model/category.model.js";
import { catchAsyncError } from "../utils/catchAsyncErrors.js";
import { AppError } from "../utils/ApiError.js";
export const createCategory = catchAsyncError(async (req, res, next) => {
    const { name, slug } = req.body;
    const isCategoryExist = await CategoryModel.findOne({ slug });
    if (isCategoryExist) {
        return next(new AppError("Category already exists", 400));
    }
    const category = new CategoryModel({
        name,
        slug
    })
    await category.save();
    if (!category) {
        return next(new AppError("Category not created", 400))
    }
    res.status(200).json(category, { message: "Category created successfully" });
    next();

})

export const getAllCategory = catchAsyncError(async (req, res) => {
    const category = await CategoryModel.find();
    if (!category) {
        return res.status(400).json({ message: "Category not found" })
    }
    res.status(200).json(category);
});

export const deleteCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const category = await CategoryModel.findById(id);

    if (!category) {
        return next(new AppError("Category not found", 404));
    }

    await category.deleteOne();

    res.status(200).json({
        success: true,
        message: "Category deleted successfully"
    });
});