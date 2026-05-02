import { prisma } from "../../config/prisma.ts";
import type { ChatCreateInput } from "../../../prisma/prisma/models/Chat.ts";

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
    return await prisma.chat.delete({ where: { id } });
}