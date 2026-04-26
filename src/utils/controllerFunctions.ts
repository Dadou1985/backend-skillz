import type { Request, Response } from "express";

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
        if (!data) return res.status(400).json({ message: clientErrorMessage });
        const result = await serviceFunction(data);
        return res.status(201).json(result);
    } catch (error) {
        return handleControllerError(res, serverErrorMessage, error);
    }
}

export const getAllController = async <T>(res: Response, serviceFunction: () => Promise<T>, serverErrorMessage: string) => {
    try {
        const result = await serviceFunction();
        return res.status(200).json(result);
    } catch (error) {
        return handleControllerError(res, serverErrorMessage, error);
    }
}

export const getByIdController = async <T>(req: Request, res: Response, serviceFunction: (id: string) => Promise<T>, notFoundMessage: string, serverErrorMessage: string) => {
    const { id } = req.params;
    try {
        const result = await serviceFunction(id as string);
        if (!result) return handleNotFound(res, notFoundMessage);
        return res.status(200).json(result);
    } catch (error) {
        return handleControllerError(res, serverErrorMessage, error);
    }
}

export const updateController = async <T, D>(req: Request, res: Response, serviceFunction: (id: string, data: D) => Promise<T>, notFoundMessage: string, serverErrorMessage: string) => {
    const { id } = req.params;
    const data = req.body as D;
    try {
        if (!id) return handleNotFound(res, 'ID parameter is required');
        if (!data) return handleNotFound(res, 'Update data is required');

        const result = await serviceFunction(id as string, data);
        if (!result) return handleNotFound(res, notFoundMessage);
        
        return res.status(200).json(result);
    } catch (error) {
        return handleControllerError(res, serverErrorMessage, error);
    }
}

export const deleteController = async (req: Request, res: Response, serviceFunction: (id: string) => Promise<unknown>, serverErrorMessage: string) => {
    const { id } = req.params;
    try {
        await serviceFunction(id as string);
        return res.status(204).send();
    } catch (error) {
        return handleControllerError(res, serverErrorMessage, error);
    }
}
