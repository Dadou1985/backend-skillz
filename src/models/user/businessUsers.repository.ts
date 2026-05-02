import { prisma } from "../../config/prisma.ts";
import type { BusinessUserCreateInput } from "../../../prisma/prisma/models/BusinessUser.ts"

const safeBusinessUserSelect = {
    id: true,
    adminStatus: true,
    email: true,
    hotelId: true,
    username: true,
    createdAt: true,
    updatedAt: true,
    hotel: true,
};

export async function createBusinessUser(data: BusinessUserCreateInput) {
    return await prisma.businessUser.create({ data, select: safeBusinessUserSelect });
}

export async function getBusinessUsers() {
    return await prisma.businessUser.findMany();
}

export async function getBusinessUserById(id: string) {
    return await prisma.businessUser.findUnique({ where: { id }, select: safeBusinessUserSelect });
}

export async function updateBusinessUser(id: string, data: Partial<BusinessUserCreateInput>) {
    return await prisma.businessUser.update({ where: { id }, data, select: safeBusinessUserSelect });
}

export async function deleteBusinessUser(id: string) {
    return await prisma.businessUser.delete({ where: { id }, select: safeBusinessUserSelect });
}