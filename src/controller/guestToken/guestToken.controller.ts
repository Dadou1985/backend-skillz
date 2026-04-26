import {
    createGuestTokenService,
    deleteGuestTokenService,
    getAllGuestTokensService,
    getGuestTokenByIdService,
    updateGuestTokenService,
} from "../../services/guestToken/guestToken.services";
import {
    createController,
    deleteController,
    getByIdController,
    getAllController,
    updateController,
} from '../../utils/controllerFunctions';
import type { Request, Response } from 'express';

export const createGuestTokenController = (req: Request, res: Response) =>
    createController(req, res, createGuestTokenService, 'Guest token data is required', 'Failed to create guest token');

export const getGuestTokensController = (res: Response) =>
    getAllController(res, getAllGuestTokensService, 'Failed to retrieve guest tokens');

export const getGuestTokenByIdController = (req: Request, res: Response) =>
    getByIdController(req, res, getGuestTokenByIdService, 'Guest token not found', 'Failed to retrieve guest token');

export const updateGuestTokenController = (req: Request, res: Response) =>
    updateController(req, res, updateGuestTokenService, 'Guest token not found', 'Failed to update guest token');

export const deleteGuestTokenController = (req: Request, res: Response) =>
    deleteController(req, res, deleteGuestTokenService, 'Failed to delete guest token');