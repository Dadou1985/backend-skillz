import { prisma } from "../../config/prisma.ts";
import type { CheckListCreateInput } from "../../prisma/models/CheckList.ts";

export async function createCheckList(data: CheckListCreateInput) {
    return await prisma.checkList.create({ data });
}

export async function getCheckLists() {
    return await prisma.checkList.findMany();
}

export async function getCheckListById(id: string) {
    return await prisma.checkList.findUnique({ where: { id } });
}

export async function updateCheckList(id: string, data: Partial<CheckListCreateInput>) {
    return await prisma.checkList.update({ where: { id }, data });
}

export async function deleteCheckList(id: string) {
    return await prisma.checkList.delete({ where: { id } });
}
