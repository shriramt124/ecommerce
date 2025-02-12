import User from "../model/user.model.js";
import { AppError } from "../utils/ApiError.js";
import { catchAsyncError } from "../utils/catchAsyncErrors.js";


export const addUser = catchAsyncError(async (req, res, next) => {
    const { FirstName, LastName, Email, Password, role } = req.body;
    if (!FirstName || !LastName || !Email || !Password || !role) {
        return next(new AppError("All Fields are required", 401));//bad request 
    }
    const user = await User.create({
        FirstName,
        LastName,
        Email,
        Password,
        role
    })
    await user.save();
    res.stauts(201).json({
        message: "User created successfully"
    })
})


export const getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        message:"all users got successfully",
        users
    })
    

})

export const updateUser = catchAsyncError(async (req, res, next) => {
    console.log("running")
    const { id } = req.params;
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
       new:true
    })
    updateUser && res.status(201).json({ message: "User updated successfully" });
    !updateUser && next(new AppError("User was not found", 404));

})



