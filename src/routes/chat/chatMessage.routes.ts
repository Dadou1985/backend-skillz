import {
    createChatMessageController,
    deleteChatMessageController,
    getChatMessagesController,
    updateChatMessageController,
    getChatMessageByIdController
} from '../../controller/chat/chatMessage.controller.ts';
import { validateRequestBody } from '../../middlewares/validation/validator.middleware.ts';
import { ChatMessageSchema, ChatMessageUpdateSchema } from '../../validations/zodValidation.ts';
import { Router } from 'express';

const router = Router();

router.post('/', validateRequestBody(ChatMessageSchema), createChatMessageController);

router.get('/', getChatMessagesController);

router.get('/:id', getChatMessageByIdController);

router.patch('/:id', validateRequestBody(ChatMessageUpdateSchema), updateChatMessageController);

router.delete('/:id', deleteChatMessageController);

export default router;