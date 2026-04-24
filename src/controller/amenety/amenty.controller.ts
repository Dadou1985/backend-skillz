import {
    createAmenetyService,
    deleteAmenetyService,
    getAmenetiesService,
    getAmenetyByIdService,
} from '../../services/amenety/amenety.services';

import type { Request, Response } from 'express';
import {
    createController,
    deleteController,
    getAllController,
    getByIdController,
} from '../../utils/controllerFunctions';

export const createAmenetyController = (req: Request, res: Response) =>
    createController(req, res, createAmenetyService, 'Amenety data is required', 'Failed to create amenety');

export const getAmenetiesController = (_req: Request, res: Response) =>
    getAllController(res, getAmenetiesService, 'Failed to retrieve ameneties');

export const getAmenetyByIdController = (req: Request, res: Response) =>
    getByIdController(req, res, getAmenetyByIdService, 'Amenety not found', 'Failed to retrieve amenety');

export const deleteAmenetyController = (req: Request, res: Response) =>
    deleteController(req, res, deleteAmenetyService, 'Failed to delete amenety');
