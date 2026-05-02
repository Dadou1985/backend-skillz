import { verifyToken } from "../../utils/jwt/verifyToken.ts";
import { AppError } from "../../utils/customError.ts";
import { logger } from "../../utils/logger.ts";
import type { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
    userId: string;
  }

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new AppError("Authorization header missing", 401, "AUTH_HEADER_MISSING"));
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return next(new AppError("Token missing", 401, "TOKEN_MISSING"));
    }

    try {
        const decoded = verifyToken(token);
        req.userId  = decoded.userId;
        next();
    } catch (error) {
        logger.error("Token verification failed", { error });
        return next(new AppError("Invalid token", 401, "INVALID_TOKEN"));
    }
}