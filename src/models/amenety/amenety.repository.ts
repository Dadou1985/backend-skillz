import { prisma } from "../../config/prisma";
import type { AmenetyCreateInput } from "../../prisma/models/Amenety";

export async function createAmenety(data: AmenetyCreateInput) {
    return await prisma.amenety.create({ data });
}

export async function getAmeneties(id: string) {
    return await prisma.amenety.findMany({ where: { id: id } });
}

export async function getAmenetyById(id: string) {
    return await prisma.amenety.findUnique({ where: { id } });
}

export async function updateAmenety(id: string, data: Partial<AmenetyCreateInput>) {
    return await prisma.amenety.update({ where: { id }, data });
}

export async function deleteAmenety(id: string) {
    return await prisma.amenety.delete({ where: { id } });
}