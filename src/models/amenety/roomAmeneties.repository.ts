import { prisma } from "../../config/prisma";
import type { RoomAmenetiesCreateInput } from "../../prisma/models/RoomAmeneties";
import type { RoomAmenetiesRepository } from "../../types/types";

export async function createRoomAmenety(data: RoomAmenetiesCreateInput) {
    return await prisma.roomAmeneties.create({ data });
}

export async function getRoomAmeneties(data: RoomAmenetiesRepository) {
    return await prisma.roomAmeneties.findMany({ where: data });
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