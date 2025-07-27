import express from "express";
import {protectRoute} from "../middleware/auth.middleware.js"
import { getAiResponse,getAiResponseHistory,saveMessage} from "../controllers/ai.controller.js";
const router=express.Router();

router.post("/chat",protectRoute,getAiResponse);
router.get("/responseHistory",protectRoute,getAiResponseHistory);
router.post("/saveMessage",protectRoute,saveMessage);
export default router;

