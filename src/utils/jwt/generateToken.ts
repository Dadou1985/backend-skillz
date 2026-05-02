import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/env';

export const generateToken = (userId: string): string => {
    const payload = { userId };
    return jwt.sign(payload, JWT_SECRET, { expiresIn : '1h' });
}