import {
    createChatService,
    deleteChatService,
    getChatByIdService,
    getChatsService,
    updateChatService,
} from '../../services/chat/chat.services.ts';

import type { Request, Response } from 'express';
import {
    createController,
    deleteController,
    getByIdController,
    updateController,
    getAllController
} from '../../utils/controllerFunctions.ts';

export const createChatController = (req: Request, res: Response) =>
    createController(req, res, createChatService, 'Chat data is required', 'Failed to create chat');

export const getChatsController = (res: Response) =>
    getAllController(res, getChatsService, 'Chats not found');

export const getChatByIdController = (req: Request, res: Response) =>
    getByIdController(req, res, getChatByIdService, 'Chat not found', 'Failed to retrieve chat');

export const updateChatController = (req: Request, res: Response) =>
    updateController(req, res, updateChatService, 'Chat not found', 'Failed to update chat');

export const deleteChatController = (req: Request, res: Response) =>
    deleteController(req, res, deleteChatService, 'Failed to delete chat');
