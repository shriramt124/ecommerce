import { ProductModel } from "../model/product.model.js";
import { catchAsyncError } from "../utils/catchAsyncErrors.js";
import { AppError } from "../utils/ApiError.js";
import slugify from "slugify";

export const addProduct = catchAsyncError(async (req, res, next) => {
    const images = req.files.prodImages.map((ele) => ele.filename);
    req.body.images = images;
    req.body.slug = slugify(req.body.title);
    const addProduct = new ProductModel(req.body);
    await addProduct.save();
    res.status(201).json({ message: "success", addProduct });
});

export const getAllProduct = catchAsyncError(async (req, res, next) => {
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
    if (req.body.title) {
        req.body.slug = slugify(req.body.title);
    }
    const updatedProduct = await ProductModel.findByIdAndUpdate(productId, req.body, {
        new: true
    });
    if (updatedProduct) {
        res.status(200).json({ message: "success", updatedProduct });
    } else {
        next(new AppError("Product was not found", 404));
    }
});

export const deleteProduct = catchAsyncError(async (req, res, next) => {
    const productId = req.params.id;
    await ProductModel.findByIdAndDelete(productId);
    res.status(204).json({ message: "success" });
});
