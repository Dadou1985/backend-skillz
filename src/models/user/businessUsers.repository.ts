import { prisma } from "../../config/prisma.ts";
import type { BusinessUserCreateInput } from "../../../prisma/prisma/models/BusinessUser.ts"

export async function createBusinessUser(data: BusinessUserCreateInput) {
    return await prisma.businessUser.create({ data });
}

export async function getBusinessUsers() {
    return await prisma.businessUser.findMany();
}

export async function getBusinessUserById(id: string) {
    return await prisma.businessUser.findUnique({ where: { id } });
}

export async function updateBusinessUser(id: string, data: Partial<BusinessUserCreateInput>) {
    return await prisma.businessUser.update({ where: { id }, data });
}

export async function deleteBusinessUser(id: string) {
    return await prisma.businessUser.delete({ where: { id } });
}