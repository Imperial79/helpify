import express from "express";
import { createConversation, getConversation, getExistingConversation } from "../controllers/Conversation.js";
const router = express.Router();

// Create a new Conversation
router.post('/conversations', createConversation);

// Get an Existing Conversation
router.get('/conversations', getExistingConversation);

// Get Messages for a Conversation
router.get('/conversations/:conversationId/messages', getConversation);

// Send a Message
router.post('/conversations/:conversationId/messages', );

export {router as conversationRouter};