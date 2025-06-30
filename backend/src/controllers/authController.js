import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'; // Importing bcrypt for password hashing
import generateToken from '../lib/utils.js'; 
import cloudinary from '../lib/cloudinary.js';
import TempUser from '../models/tempUser.js';
import { sendOtpEmail } from '../lib/sentOtpEmail.js';



// Signup controller
export const signup = async (req, res) => {
  const { email, fullname, password } = req.body;

  try {
    if (!email || !fullname || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Clear any previous unverified requests
    await TempUser.deleteOne({ email });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const tempUser = new TempUser({
      email,
      fullname,
      password: hashedPassword,
      otp,
      otpExpires,
    });

    await tempUser.save();

    await sendOtpEmail(email, otp);

    return res.status(200).json({
      message:
        "OTP sent to your email. Please verify your email to complete the signup process.",
    });
  } catch (error) {
    console.error("Error during signup controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Login controller
export const login = async(req,res)=>{
    const {email, password} = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({message: "Please fill all the fields"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid Credentials"});
        }
        else{
            const isPasswordValid = await bcrypt.compare(password, user.password); // Compare the hashed password with the input password
            if(!isPasswordValid){
                return res.status(400).json({message: "Invalid Credentials"});
            }
            else{
                // generate jwt token here 
                generateToken(user._id, res); // Call the utility function to generate a token
                res.status(200).json({
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    profilePic: user.profilePic,
                });
            }
        }
            
    }
    catch(error){
        console.error("Error during login controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

// Logout controller
export const logout = (req,res)=>{
    try{
        res.cookie("jwt","", {maxAge:0, })
        res.status(200).json({message: "User logged out successfully"});
    }catch{
        console.error("Error during logout controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

// Update profile controller
export const updateProfile = async(req, res)=>{
    try{
        const {profilePic} = req.body;
        const userId = req.user._id; // Access the user ID from the request object
        if(!profilePic){
            return res.status(400).json({message: "Please provide a profile picture"});
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url},{new:true} );
        res.status(200).json({updatedUser});
    }
    catch(error){
        console.error("Error during updateProfile controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
};

// Check authentication controller
export const checkAuth = (req, res) => {
    try{
        res.status(200).json(req.user);
    }
    catch(error){
        console.error("Error during checkAuth controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
};
    