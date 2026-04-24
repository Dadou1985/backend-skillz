import { prisma } from "../../config/prisma";
import type { ChatCreateInput } from "../../prisma/models/Chat";

export async function createChat(data: ChatCreateInput) {
    return await prisma.chat.create({ data });
}

export async function getChats(id: string) {
    return await prisma.chat.findMany({ where: { hotelId: id } });
}

export async function getChatById(id: string) {
    return await prisma.chat.findUnique({ where: { id } });
}

export async function updateChat(id: string, data: Partial<ChatCreateInput>) {
    return await prisma.chat.update({ where: { id }, data });
}

export async function deleteChat(id: string) {
    return await prisma.chat.delete({ where: { id } });
}