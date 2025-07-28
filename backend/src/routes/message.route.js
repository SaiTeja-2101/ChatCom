import express from "express";
import  {protectRoute} from "../middleware/auth.middleware.js";
import {getAllUsers,getMessages,sendMessage} from "../controllers/message.controller.js";
const router=express.Router();
// Make sure your routes look like this:
router.get("/users", protectRoute, getAllUsers);
router.get("/users/:id", protectRoute, getMessages);  // ✅ :id not :
router.post("/send/:id", protectRoute, sendMessage);  // ✅ :id not :
export default router;