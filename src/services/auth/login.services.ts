import { loginUser } from "../../models/auth/loginUser.repository";
import { generateToken } from "../../utils/jwt/generateToken";
import { AppError } from "../../utils/customError";
import type { userCategory } from "../../types/types";

export async function loginUserService(email: string, password: string, category: userCategory) {
    const user = await loginUser(email, category);
    if (!user) {
        throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }

    if (user.password !== password) {
        throw new AppError('Password is not valid', 400, 'PASSWORD_INVALID');
    }

    if (user.email !== email) {
        throw new AppError('Email is not valid', 401, 'EMAIL_INVALID');
    }
    const token = generateToken(user.id);   
    return token;
}