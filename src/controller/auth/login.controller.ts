import { loginUserService } from "../../services/auth/login.services";
import { AppError } from "../../utils/customError";

import type { Request, Response } from "express";

export async function loginUserController(req: Request, res: Response) {
    const { email, password, category } = req.body;
    if (!category) {
        throw new AppError('Category and ID are required', 400, 'MISSING_CREDENTIALS');
    }
    try {
        const token = await loginUserService(email, password, category);
        res.status(200).json({ token });
    } catch (error) {
        console.error('Login failed', error);
        throw new AppError('Login failed', 500,'INTERNAL_SERVER_ERROR');
    }
}