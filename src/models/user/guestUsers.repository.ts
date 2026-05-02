import { prisma } from "../../config/prisma.ts";
import type { GuestUserCreateInput } from "../../../prisma/prisma/models/GuestUser.ts";

export async function createGuestUser(data: GuestUserCreateInput) {
    return await prisma.guestUser.create({ data });
}

export async function getGuestUsers() {
    return await prisma.guestUser.findMany();
}

export async function getGuestUserById(id: string) {
    return await prisma.guestUser.findUnique({ where: { id } });
}

export async function updateGuestUser(id: string, data: Partial<GuestUserCreateInput>) {
    return await prisma.guestUser.update({ where: { id }, data });
}

export async function deleteGuestUser(id: string) {
    return await prisma.guestUser.delete({ where: { id } });
}