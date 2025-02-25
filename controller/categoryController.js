import { CategoryModel } from "../model/category.model.js";
import { catchAsyncError } from "../utils/catchAsyncErrors.js";
import { AppError } from "../utils/ApiError.js";
export const createCategory = catchAsyncError(async (req, res,next) => {
    const { name, slug } =   req.body;
    const isCategoryExist = await CategoryModel.findOne({ slug });
    if (isCategoryExist) {
       return next (new AppError("Category already exists", 400));
    }
    const category =  new CategoryModel({
        name,
        slug
    })
   await  category.save();
    if (!category) {
         return next(new AppError("Category not created", 400))
    }
    res.status(200).json(category,{message:"Category created successfully"});
    next();
     
})

export const getAllCategory =async (req, res) => {
    const category =await  CategoryModel.find();
    if (!category) {
        return res.status(400).json({message:"Category not found"})
    }
    res.status(200).send(category);
}