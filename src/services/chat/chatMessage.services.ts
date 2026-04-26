import {
    createChatMessage,
    deleteChatMessage,
    getChatMessageById,
    getChatMessages,
    updateChatMessage,
} from '../../models/chat/chatMessage.repository';

export async function createChatMessageService(data: Parameters<typeof createChatMessage>[0]) {
    return await createChatMessage(data);
}

export async function getChatMessagesService() {
    return await getChatMessages();
}

export async function getChatMessageByIdService(id: Parameters<typeof getChatMessageById>[0]) {
    return await getChatMessageById(id);
}

export async function updateChatMessageService(
    id: Parameters<typeof updateChatMessage>[0],
    data: Parameters<typeof updateChatMessage>[1]
) {
    return await updateChatMessage(id, data);
}

export async function deleteChatMessageService(id: Parameters<typeof deleteChatMessage>[0]) {
    return await deleteChatMessage(id);
}