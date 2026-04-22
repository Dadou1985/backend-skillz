import { prisma } from "../../config/prisma";
import type { ChatCreateInput } from "../../prisma/models/Chat";

export async function createChat(data: ChatCreateInput) {
    return await prisma.chat.create({ data });
}

export async function getChats() {
    return await prisma.chat.findMany();
}

export async function getChatById(id: string) {
    return await prisma.chat.findUnique({ where: { id } });
}

export async function updateChat(id: string, data: Partial<ChatCreateInput>) {
    return await prisma.chat.update({ where: { id }, data });
}

export async function deleteChat(id: string) {
    return await prisma.$transaction(async (tx) => {
        // Delete child messages first to avoid FK constraint violation
        await tx.chatMessage.deleteMany({ where: { chatId: id } });
        // Then delete the chat
        return await tx.chat.delete({ where: { id } });
    });
}