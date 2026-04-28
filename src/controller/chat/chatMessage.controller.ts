import {
    createChatMessageService,
    deleteChatMessageService,
    getChatMessageByIdService,
    getChatMessagesService,
    updateChatMessageService,
} from '../../services/chat/chatMessage.services.ts';

import type { Request, Response } from 'express';
import {
    createController,
    deleteController,
    getByIdController,
    updateController,
    getAllController
} from '../../utils/controllerFunctions.ts';

export const createChatMessageController = (req: Request, res: Response) =>
    createController(req, res, createChatMessageService, 'Chat message data is required', 'Failed to create chat message');

export const getChatMessagesController = (res: Response) =>
    getAllController(res, getChatMessagesService, 'Chat messages not found');

export const getChatMessageByIdController = (req: Request, res: Response) =>
    getByIdController(req, res, getChatMessageByIdService, 'Chat message not found', 'Failed to retrieve chat message');

export const updateChatMessageController = (req: Request, res: Response) =>
    updateController(req, res, updateChatMessageService, 'Chat message not found', 'Failed to update chat message');

export const deleteChatMessageController = (req: Request, res: Response) =>
    deleteController(req, res, deleteChatMessageService, 'Failed to delete chat message');
