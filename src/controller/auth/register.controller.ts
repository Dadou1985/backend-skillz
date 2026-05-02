import { registerUserService } from "../../services/auth/register.services";
import type { Request, Response } from "express";
import { AppError } from "../../utils/customError";

export async function registerUserController(req: Request, res: Response) {
    const { data } = req.body;
    if (!data) {
        throw new AppError('User data is required', 400, 'MISSING_DATA');
    }
    try {
        const token = await registerUserService(data);
        res.status(201).json({ token });
    } catch (error) {
        console.error('Registration failed', error);
        throw new AppError('Registration failed', 500, 'INTERNAL_SERVER_ERROR');
    }
}