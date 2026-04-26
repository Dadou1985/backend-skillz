import type { Request, Response, NextFunction } from "express";
import { z } from 'zod';

export function validateRequestBody(schema: z.ZodObject) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse({body: req.body});
      
          if (!result.success) {
      
            return res.status(400).json({
      
              message: "Validation error",
      
              errors: result.error.flatten(),
      
            });
      
          }
      
          req.body = result.data.body ?? req.body;
        next();
    };
}