import express from 'express';
import { signup, login, logout } from '../controllers/authController.js'; // Importing the authentication controller functions
const router = express.Router();

router.post('/signup', signup); // Route for user signup
router.post('/login', login); // Route for user login
router.post('/logout', logout); // Route for user logout

export default router;