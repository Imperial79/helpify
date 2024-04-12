import express from "express";
import { MessageModel } from "../models/Message_model.js";
import {ConversationModel} from "../models/Conversation_model.js";
export const createConversation = async (req, res) => {
    try {
      const { participants } = req.body;
      const newConversation = new Conversation({ participants });
      await newConversation.save();
      res.status(201).json(newConversation);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

export const getExistingConversation = async (req, res) => {
    try {
      const { participants } = req.query;
      const conversation = await ConversationModel.findOne({
        participants: { $all: participants.split(',') }
      });
      if (!conversation) {
        return res.status(404).json({ message: 'Conversation not found' });
      }
      res.json(conversation);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  export const getConversation = async (req, res) => {
    try {
      const { conversationId } = req.params;
      const messages = await MessageModel.find({ conversation: conversationId }).sort({ createdAt: 1 });
      res.json(messages);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  export const sendMessage = async (req, res) => {
    try {
      const { conversationId } = req.params;
      const { sender, content } = req.body;
      const newMessage = new MessageModel({
        conversation: conversationId,
        sender,
        content
      });
      await newMessage.save();
      res.status(201).json(newMessage);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }