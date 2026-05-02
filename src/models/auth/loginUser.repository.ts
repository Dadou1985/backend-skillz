import { prisma } from "../../config/prisma.ts";
import type { AuthPayload } from "../../types/types.ts";

export async function loginUser(email: string,  category: AuthPayload['category']) {
    if (category === 'business') {
        return await prisma.businessUser.findFirst({ where: { email } });
    } else {
        return await prisma.guestUser.findFirst({ where: { email } });
    }
}