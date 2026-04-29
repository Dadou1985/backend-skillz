import {
    createChatController,
    deleteChatController,
    getChatByIdController,
    getChatsController,
    updateChatController,
} from '../../controller/chat/chat.controller.ts';
import { validateRequestBody } from '../../middlewares/validation/validator.middleware.ts';
import { ChatSchema } from '../../validations/zodValidation.ts';
import { Router } from 'express';

const router = Router();

router.post('/', validateRequestBody(ChatSchema), createChatController);

router.get('/', getChatsController);

router.get('/:id', getChatByIdController);

router.put('/:id', validateRequestBody(ChatSchema), updateChatController);

router.delete('/:id', deleteChatController);

export default router;