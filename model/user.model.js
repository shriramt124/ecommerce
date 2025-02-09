import mongoose from "mongoose";
import validator from "validator"

const userSchema = new mongoose.Schema({
    FirstName:{
        type:String,
        required:true,
    },
    LastName:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
        validate:{
            validator:validator.isEmail,
            message:"Invalid Email Format"
        }
    },
    Password:{
        type:String,
        required:[true,"Password is required"]
    },
    ResetPasswordToken: {
        type: String,
    },
    ResetPasswordExpires: {
        type: Date,
    },
    
},{
    timestamps:true
})

const User = mongoose.model("user",userSchema);

export default  User;