import { prisma } from "../../config/prisma";
import type { ChatMessageCreateInput } from "../../prisma/models/ChatMessage";

export async function createChatMessage(data: ChatMessageCreateInput) {
    return await prisma.chatMessage.create({ data });
}

export async function getChatMessages() {
    return await prisma.chatMessage.findMany();
}

export async function getChatMessageById(id: string) {
    return await prisma.chatMessage.findUnique({ where: { id } });
}

export async function updateChatMessage(id: string, data: Partial<ChatMessageCreateInput>) {
    return await prisma.chatMessage.update({ where: { id }, data });
}

export async function deleteChatMessage(id: string) {
    return await prisma.chatMessage.delete({ where: { id } });
}

