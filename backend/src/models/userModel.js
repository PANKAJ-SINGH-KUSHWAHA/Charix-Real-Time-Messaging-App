import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true,
        },
        fullname:{
            type: String,
            required: true,
        },
        password:{
            type: String,
            required: true,
        },
        profilePic:{
            type: String,
            default: "",
        },
},
    { timestamps: true, } // Automatically manage createdAt and updatedAt timestamps
);

const User = mongoose.model("User", userSchema);

export default User; // Export the User model for use in other parts of the application