import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/env';

export interface JWTPayload {
    userId: string;
}

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch (error) {
        throw new Error('Invalid token', { cause: error });
    }
}