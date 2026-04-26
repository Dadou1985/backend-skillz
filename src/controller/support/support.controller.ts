import {
    createSupportService,
    deleteSupportService,
    getSupportByIdService,
    getSupportsService,
    updateSupportService,
} from '../../services/support/support.services';

import type { Request, Response } from 'express';
import {
    createController,
    deleteController,
    getAllController,
    getByIdController,
    updateController,
} from '../../utils/controllerFunctions';

export const createSupportController = (req: Request, res: Response) =>
    createController(req, res, createSupportService, 'Support data is required', 'Failed to create support');

export const getSupportsController = (res: Response) =>
    getAllController(res, getSupportsService, 'Failed to retrieve supports');

export const getSupportByIdController = (req: Request, res: Response) =>
    getByIdController(req, res, getSupportByIdService, 'Support not found', 'Failed to retrieve support');

export const updateSupportController = (req: Request, res: Response) =>
    updateController(req, res, updateSupportService, 'Support not found', 'Failed to update support');

export const deleteSupportController = (req: Request, res: Response) =>
    deleteController(req, res, deleteSupportService, 'Failed to delete support');
