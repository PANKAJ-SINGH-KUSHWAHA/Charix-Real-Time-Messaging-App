import mongoose from "mongoose";

const tempUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        required: true,
    },
    otp:{
        type: String,
        required: true,
    },
    otpExpires: {
        type: Date,
        required: true,
    },
},
    {
        timestamps: true,
    });

const TempUser = mongoose.model("TempUser", tempUserSchema);
export default TempUser; 