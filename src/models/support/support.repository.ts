import { prisma } from "../../config/prisma";
import type { SupportCreateInput } from "../../prisma/models/Support";

export async function createSupport(data: SupportCreateInput) {
    return await prisma.support.create({ data });
}

export async function getSupports() {
    return await prisma.support.findMany();
}

export async function getSupportById(id: string) {
    return await prisma.support.findUnique({ where: { id } });
}

export async function updateSupport(id: string, data: Partial<SupportCreateInput>) {
    return await prisma.support.update({ where: { id }, data });
}

export async function deleteSupport(id: string) {
    return await prisma.support.delete({ where: { id } });
}