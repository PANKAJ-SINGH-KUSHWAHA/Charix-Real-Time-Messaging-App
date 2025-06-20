import express from 'express'; // It is a web framework for Node.js used to build APIs and web applications
import dotenv from 'dotenv'; // It is a zero-dependency module that loads environment variables from a .env file into process.env
import cookieParser from 'cookie-parser'; // It is a middleware for parsing cookies in HTTP requests

import { connectDB } from './lib/db.js'; // Importing the database connection function

import authRoutes from './routes/authRoutes.js'; // Importing the authentication routes
import messageRoutes from './routes/messageRoutes.js'; // Importing the message routes

import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json({ limit: '20mb' })); // or higher if needed
app.use(express.urlencoded({ extended: true, limit: '20mb' }));app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});