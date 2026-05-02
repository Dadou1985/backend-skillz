import {
    createChatController,
    deleteChatController,
    getChatByIdController,
    getChatsController,
    updateChatController,
} from '../../controller/chat/chat.controller.ts';
import { validateRequestBody } from '../../middlewares/validation/validator.middleware.ts';
import { ChatSchema, ChatUpdateSchema } from '../../validations/zodValidation.ts';
import { Router } from 'express';

const router = Router();

router.post('/', validateRequestBody(ChatSchema), createChatController);

router.get('/', getChatsController);

router.get('/:id', getChatByIdController);

router.patch('/:id', validateRequestBody(ChatUpdateSchema), updateChatController);

router.delete('/:id', deleteChatController);

export default router;