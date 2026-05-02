import { loginUserService } from "../../services/auth/login.services";
import { AppError } from "../../utils/customError";

import type { Request, Response } from "express";

export async function loginUserController(req: Request, res: Response) {
    const { email, password, category } = req.body;
    if (!email || !password || !category) {
        throw new AppError('Email, password, and category are required', 400, 'MISSING_CREDENTIALS');
    }
    const token = await loginUserService(email, password, category);
    res.status(200).json({ token });
}