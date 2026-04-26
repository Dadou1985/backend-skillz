import { prisma } from '../../config/prisma';
import type { CheckListItemCreateInput } from '../../prisma/models/CheckListItem';

export async function createCheckListItem(data: CheckListItemCreateInput) {
    return await prisma.checkListItem.create({ data });
}

export async function getCheckListItems(id: string) {
    return await prisma.checkListItem.findMany({ where: { checkListId: id } });
}

export async function getCheckListItemById(id: string) {
    return await prisma.checkListItem.findUnique({ where: { id } });
}

export async function updateCheckListItem(id: string, data: Partial<CheckListItemCreateInput>) {
    return await prisma.checkListItem.update({ where: { id }, data });
}

export async function deleteCheckListItem(id: string) {
    return await prisma.checkListItem.delete({ where: { id } });
}