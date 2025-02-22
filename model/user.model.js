import mongoose from "mongoose";
import validator from "validator"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    profileImage: {
        type: String,
        default: ""
    },
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
    },
    cart: {
        type: Array,
        default:[]
    },
    isBlocked: {
        type: Boolean,
        default: false
        
    },
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
    }],
    whishlist:[{type:mongoose.Schema.Types.ObjectId,ref:"Product"}],
    phoneNumber: {
        type: String,
        trim: true
    },
    bio: {
        type: String,
        maxLength: [250, "Bio cannot exceed 250 characters"]
    },
    refreshToken: {
        type: String,
        default: null
    },
    refreshTokenExpires: {
        type: Date,
        default: null
    }
    
},{
    timestamps:true
})

userSchema.pre("save", function () {
    if (!this.isModified("Password")) return;
    this.Password =   bcrypt.hashSync(this.Password, 10);

});

userSchema.pre("findOneAndUpdate", function () {
    if (this._update.Password) {
        this._update.Password = bcrypt.hashSync(this._update.Password, 8);
    }

});
const User = mongoose.model("user",userSchema);

export default  User;