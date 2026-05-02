import { createBusinessUser } from "../../models/user/businessUsers.repository";
import { createGuestUser } from "../../models/user/guestUsers.repository";
import { loginUserService } from "./login.services";
import { AppError } from "../../utils/customError";

export async function registerUserService(data: Parameters<typeof createBusinessUser | typeof createGuestUser>[0]) {
    const isBusinessUser = 'checkoutDate' in data ? 'guest' : 'business';
    const existingUser = isBusinessUser === 'business' ? await createBusinessUser(data as Parameters<typeof createBusinessUser>[0]) : await createGuestUser(data as Parameters<typeof createGuestUser>[0]);
    if (!existingUser) {
        throw new AppError('Failed to create user', 500, 'USER_CREATION_FAILED');
    }
    return await loginUserService(existingUser.email, existingUser.password, isBusinessUser);
}

