import type { Request, Response } from "express";
import { AppError } from "./customError";

export function handleControllerError(res: Response, message: string, error: unknown) {
    console.error(message, error);
    return res.status(500).json({ message });
}

export function handleNotFound(res: Response, message: string) {
    return res.status(404).json({ message });
}

export const createController = async <T, D>(req: Request, res: Response, serviceFunction: (data: D) => Promise<T>, clientErrorMessage: string, serverErrorMessage: string) => {
    const data = req.body as D;
    try {
        if (!data) throw new AppError(clientErrorMessage, 400, 'BAD_REQUEST');

        const result = await serviceFunction(data);
        return res.status(201).json(result);
    } catch (error) {
        console.error(serverErrorMessage, error);
        throw new AppError(serverErrorMessage, 500, 'INTERNAL_SERVER_ERROR');
    }
}

export const getAllController = async <T>(res: Response, serviceFunction: () => Promise<T>, serverErrorMessage: string) => {
    try {
        const result = await serviceFunction();
        return res.status(200).json(result);
    } catch (error) {
        console.error(serverErrorMessage, error);
        throw new AppError(serverErrorMessage, 500, 'INTERNAL_SERVER_ERROR');
    }
}

export const getByIdController = async <T>(req: Request, res: Response, serviceFunction: (id: string) => Promise<T>, notFoundMessage: string, serverErrorMessage: string) => {
    const { id } = req.params;
    try {
        const result = await serviceFunction(id as string);
        if (!result) throw new AppError(notFoundMessage, 404, 'NOT_FOUND');
        return res.status(200).json(result);
    } catch (error) {
        console.error(serverErrorMessage, error);
        throw new AppError(serverErrorMessage, 500, 'INTERNAL_SERVER_ERROR');
    }
}

export const updateController = async <T, D>(req: Request, res: Response, serviceFunction: (id: string, data: D) => Promise<T>, notFoundMessage: string, serverErrorMessage: string) => {
    const { id } = req.params;
    const data = req.body as D;
    try {
        if (!id) throw new AppError('ID parameter is required', 400, 'BAD_REQUEST');
        if (!data) throw new AppError('Request body is required', 400, 'BAD_REQUEST');

        const result = await serviceFunction(id as string, data);
        if (!result) throw new AppError(notFoundMessage, 404, 'NOT_FOUND');
        
        return res.status(200).json(result);
    } catch (error) {
        console.error(serverErrorMessage, error);
        throw new AppError(serverErrorMessage, 500, 'INTERNAL_SERVER_ERROR');
    }
}

export const deleteController = async (req: Request, res: Response, serviceFunction: (id: string) => Promise<unknown>, serverErrorMessage: string) => {
    const { id } = req.params;
    try {
        await serviceFunction(id as string);
        return res.status(204).send();
    } catch (error) {
        console.error(serverErrorMessage, error);
        throw new AppError(serverErrorMessage, 500, 'INTERNAL_SERVER_ERROR');
    }
}
