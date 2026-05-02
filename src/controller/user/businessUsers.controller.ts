import {
    createBusinessUserService,
    deleteBusinessUserService,
    getBusinessUserByIdService,
    getBusinessUsersService,
    updateBusinessUserService,
} from '../../services/user/businessUsers.services.ts';

import type { Request, Response } from 'express';
import {
    createController,
    deleteController,
    getAllController,
    getByIdController,
    updateController,
} from '../../utils/controllerFunctions.ts';

export const createBusinessUserController = (req: Request, res: Response) =>
    createController(req, res, createBusinessUserService, 'Business user data is required', 'Failed to create business user');

export const getBusinessUsersController = (_req: Request, res: Response) =>
    getAllController(res, getBusinessUsersService, 'Failed to retrieve business users');

export const getBusinessUserByIdController = (req: Request, res: Response) =>
    getByIdController(req, res, getBusinessUserByIdService, 'Business user not found', 'Failed to retrieve business user');

export const updateBusinessUserController = (req: Request, res: Response) =>
    updateController(req, res, updateBusinessUserService, 'Business user not found', 'Failed to update business user');

export const deleteBusinessUserController = (req: Request, res: Response) =>
    deleteController(req, res, deleteBusinessUserService, 'Failed to delete business user');
