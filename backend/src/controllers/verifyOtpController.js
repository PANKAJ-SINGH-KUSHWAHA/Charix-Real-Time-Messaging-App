import TempUser from "../models/tempUser.js";
import User from "../models/userModel.js";
import generateToken from "../lib/utils.js"; // Make sure this is imported

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const tempUser = await TempUser.findOne({ email });
    if (!tempUser) return res.status(400).json({ message: "No OTP request found" });

    if (tempUser.otp !== otp) return res.status(400).json({ message: "Incorrect OTP" });

    if (new Date() > tempUser.otpExpires) {
      await TempUser.deleteOne({ email });
      return res.status(400).json({ message: "OTP has expired" });
    }

    const { fullname, password } = tempUser;
    const newUser = new User({ email, fullname, password });
    await newUser.save();
    await TempUser.deleteOne({ email });

    // ✅ Generate token here
    generateToken(newUser._id, res);

    // ✅ Return user info with token set in cookie
    res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });

  } catch (err) {
    console.error("OTP verification error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
