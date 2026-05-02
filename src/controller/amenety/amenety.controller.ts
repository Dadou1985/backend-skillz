import {
    createAmenetyService,
    deleteAmenetyService,
    getAmenetiesService,
    getAmenetyByIdService,
    updateAmenetyService
} from '../../services/amenety/amenety.services.ts';

import type { Request, Response } from 'express';
import {
    createController,
    deleteController,
    getByIdController,
    updateController,
    getAllController
} from '../../utils/controllerFunctions.ts';

export const createAmenetyController = (req: Request, res: Response) =>
    createController(req, res, createAmenetyService, 'Amenety data is required', 'Failed to create amenety');

export const getAmenetiesController = (_req: Request, res: Response) =>
    getAllController(res, getAmenetiesService, 'Failed to retrieve ameneties');

export const getAmenetyByIdController = (req: Request, res: Response) =>
    getByIdController(req, res, getAmenetyByIdService, 'Amenety not found', 'Failed to retrieve amenety');

export const updateAmenetyController = (req: Request, res: Response) =>
    updateController(req, res, updateAmenetyService, 'Amenety not found', 'Failed to update amenety');

export const deleteAmenetyController = (req: Request, res: Response) =>
    deleteController(req, res, deleteAmenetyService, 'Failed to delete amenety');
