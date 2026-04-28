import {
    createGuestUserService,
    deleteGuestUserService,
    getGuestUserByIdService,
    getGuestUsersService,
    updateGuestUserService,
} from '../../services/user/guestUsers.services.ts';

import type { Request, Response } from 'express';
import {
    createController,
    deleteController,
    getAllController,
    getByIdController,
    updateController,
} from '../../utils/controllerFunctions.ts';

export const createGuestUserController = (req: Request, res: Response) =>
    createController(req, res, createGuestUserService, 'Guest user data is required', 'Failed to create guest user');

export const getGuestUsersController = (res: Response) =>
    getAllController(res, getGuestUsersService, 'Failed to retrieve guest users');

export const getGuestUserByIdController = (req: Request, res: Response) =>
    getByIdController(req, res, getGuestUserByIdService, 'Guest user not found', 'Failed to retrieve guest user');

export const updateGuestUserController = (req: Request, res: Response) =>
    updateController(req, res, updateGuestUserService, 'Guest user not found', 'Failed to update guest user');

export const deleteGuestUserController = (req: Request, res: Response) =>
    deleteController(req, res, deleteGuestUserService, 'Failed to delete guest user');
