import type { Request, Response } from "express";

export function validateRequestBody(req: Request, res: Response, requiredFields: string[]) {
    const data = req.body;
    if (!data) {
        return res.status(400).json({ message: "Request body is required" });
    }

    for (const field of requiredFields) {
        if (!(field in data)) {
            return res.status(400).json({ message: `Field '${field}' is required` });
        }
    }

    return null; // No validation errors
}