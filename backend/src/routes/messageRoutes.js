import express from 'express';
import { protectRoute } from '../middleware/protectRouteMiddleware.js';
import { getUsersForSidebar, getMessages, sendMessage } from '../controllers/messageController.js';
const router = express.Router();

console.log("✅ messageRoutes loaded");


router.get("/users",protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);
export default router;