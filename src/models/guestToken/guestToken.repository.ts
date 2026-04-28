import { prisma } from "../../config/prisma.ts";
import type { GuestTokenCreateInput } from "../../prisma/models/GuestToken.ts";

export async function createGuestToken(data: GuestTokenCreateInput) {
    return await prisma.guestToken.create({ data });
}

export async function getGuestTokens() {
    return await prisma.guestToken.findMany();
}

export async function getGuestTokenById(id: string) {
    return await prisma.guestToken.findUnique({ where: { id } });
}

export async function updateGuestToken(id: string, data: Partial<GuestTokenCreateInput>) {
    return await prisma.guestToken.update({ where: { id }, data });
}

export async function deleteGuestToken(id: string) {
    return await prisma.guestToken.delete({ where: { id } });
}