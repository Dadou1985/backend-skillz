import { prisma } from "../../config/prisma.ts";
import type { BusinessUserCreateInput } from "../../../prisma/prisma/models/BusinessUser.ts"
import type { GuestUserCreateInput } from "../../../prisma/prisma/models/GuestUser.ts";

export async function createUser(data: BusinessUserCreateInput & GuestUserCreateInput) {
    if (data?.checkoutDate === 'business') {
        return await prisma.businessUser.create({ data  });
    } else {
        return await prisma.guestUser.create({ data  });
    }
}