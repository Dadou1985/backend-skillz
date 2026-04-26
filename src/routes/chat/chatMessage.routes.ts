import {
    createChatMessageController,
    deleteChatMessageController,
    getChatMessagesController,
    updateChatMessageController,
    getChatMessageByIdController
} from '../../controller/chat/chatMessage.controller';
import { validateRequestBody } from '../../middlewares/validations/handleRequestValidation';
import { ChatMessageSchema } from '../../validations/zodValidation';
import { Router } from 'express';

const router = Router();

router.post('/', validateRequestBody(ChatMessageSchema), createChatMessageController);

router.get('/', getChatMessagesController);

router.get('/:id', getChatMessageByIdController);

router.put('/:id', validateRequestBody(ChatMessageSchema), updateChatMessageController);

router.delete('/:id', deleteChatMessageController);

export default router;