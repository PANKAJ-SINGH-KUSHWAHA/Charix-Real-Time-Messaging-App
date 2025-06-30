import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Charix" <${process.env.EMAIL_USERNAME}>`,
    to: email,
    subject: "Verify Your Email (OTP)",
    html: `<h2>Your OTP is: ${otp}</h2><p>This OTP is valid for 10 minutes.</p>`,
  });
};
