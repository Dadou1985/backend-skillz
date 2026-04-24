import type { Request, Response, NextFunction } from "express";

export function validateRequestBody(req: Request, res: Response, requiredFields: string[], next: NextFunction) {
    const data = req.body;
    if (!data) {
        return res.status(400).json({ message: "Request body is required" });
    }

    for (const field of requiredFields) {
        if (!(field in data)) {
            return res.status(400).json({ message: `Field '${field}' is required` });
        }
    }

    return next;
}