import express from 'express'; // It is a web framework for Node.js used to build APIs and web applications

import dotenv from 'dotenv'; // It is a zero-dependency module that loads environment variables from a .env file into process.env

import { connectDB } from './lib/db.js'; // Importing the database connection function
import authRoutes from './routes/authRoutes.js'; // Importing the authentication routes

const app = express();
dotenv.config(); // Load environment variables from .env file
app.use(express.json());
const PORT = process.env.PORT;
app.use("/api/auth", authRoutes);
 // Middleware to parse JSON request bodies
app.get('/', (req, res) => {
    res.send('Welcome to the API');
})

app.listen(PORT, () => {
    console.log('Server is running on PORT : '+PORT);
    connectDB();
});