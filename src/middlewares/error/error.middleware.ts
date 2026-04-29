import type { Request, Response, NextFunction } from "express";
import type { AppError } from "../../utils/customError";
import { z } from "zod";

export function errorHandler(error: AppError, req: Request, res: Response, next: NextFunction) {
    if (error.name === "ZodError") {
        const zodError = z.treeifyError(error as unknown as z.ZodError);
        return res.status(400).json({
    
          error: {
    
            message: "Validation error",
    
            code: "VALIDATION_ERROR",
    
            details: zodError,
    
          },
    
        });
    
      }
    
      if (error.code === "P2002") {
    
        return res.status(409).json({
    
          error: {
    
            message: "Duplicate resource",
    
            code: "DUPLICATE_RESOURCE",
    
          },
    
        });
    
      }
    const statusCode = error.statusCode || 500;
  
    res.status(statusCode).json({
      error: {
        statusCode,
        message: statusCode === 500 ? "Internal server error" : error.message,
        code: error.code || "INTERNAL_ERROR",
        isOperational: error.isOperational || false,

      },
    });
  }