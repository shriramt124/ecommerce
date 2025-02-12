import mongoose from "mongoose";
import validator from "validator"
import bcrypt from "bcryptjs"

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
    role: {
        type: String,
        required: true,
        default:"user"
    }
    
},{
    timestamps:true
})

userSchema.pre("save", function () {
    this.password =   bcrypt.hashSync(this.password, 10);

});

userSchema.pre("findOneAndUpdate", function () {
    if (this._update.password) {
        this._update.password = bcrypt.hashSync(this._update.password, 8);
    }

});
const User = mongoose.model("user",userSchema);

export default  User;