import { prisma } from "../../config/prisma";
import type { RoomAmenetiesCreateInput } from "../../prisma/models/RoomAmeneties";

export async function createRoomAmenety(data: RoomAmenetiesCreateInput) {
    return await prisma.roomAmeneties.create({ data });
}

export async function getRoomAmeneties() {
    return await prisma.roomAmeneties.findMany();
}

export async function getRoomAmenetyById(id: string) {
    return await prisma.roomAmeneties.findUnique({ where: { id } });
}

export async function updateRoomAmenety(id: string, data: Partial<RoomAmenetiesCreateInput>) {
    return await prisma.roomAmeneties.update({ where: { id }, data });
}

export async function deleteRoomAmenety(id: string) {
    return await prisma.roomAmeneties.delete({ where: { id } });
}