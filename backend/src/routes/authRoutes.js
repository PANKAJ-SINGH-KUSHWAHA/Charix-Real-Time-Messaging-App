import express from 'express';
import { signup, login, logout, updateProfile, checkAuth } from '../controllers/authController.js'; // Importing the authentication controller functions
import { protectRoute } from '../middleware/protectRouteMiddleware.js'; // Importing the middleware to protect routes
const router = express.Router();

router.post('/signup', signup); // Route for user signup
router.post('/login', login); // Route for user login
router.post('/logout', logout); // Route for user logout

router.put('/update-profile', protectRoute, updateProfile);

router.get('/check', protectRoute, checkAuth); // Route to check if the user is authenticated

export default router;