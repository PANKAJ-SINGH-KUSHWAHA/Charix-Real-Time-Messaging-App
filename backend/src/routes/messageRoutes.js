import express from 'express';
import { protectRoute } from '../middleware/protectRouteMiddleware.js';
import { getUsersForSidebar, getMessages, sendMessage } from '../controllers/messageController.js';
const router = express.Router();

router.get("/users",protectRoute, getUsersForSidebar);
router.post("/send/:id", protectRoute, sendMessage);
router.get("/:id", protectRoute, getMessages);


export default router;