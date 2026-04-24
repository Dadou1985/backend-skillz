import {
    createChat,
    deleteChat,
    getChats,
    getChatById,
    updateChat
} from '../../models/chat/chat.repository';

export async function createChatService(data: Parameters<typeof createChat>[0]) {
    return await createChat(data);
}

export async function getChatsService(id: Parameters<typeof getChats>[0]) {
    return await getChats(id);
}

export async function getChatByIdService(id: Parameters<typeof getChatById>[0]) {
    return await getChatById(id);
}

export async function updateChatService(
    id: Parameters<typeof updateChat>[0],
    data: Parameters<typeof updateChat>[1]
) {
    return await updateChat(id, data);
}

export async function deleteChatService(id: Parameters<typeof deleteChat>[0]) {
    return await deleteChat(id);
}

