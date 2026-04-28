import {
    createRoomAmenetiesService,
    deleteRoomAmenetiesService,
    getAllRoomAmenetiesService,
    getRoomAmenetiesByIdService,
    updateRoomAmenetiesService,
} from "../../services/amenety/roomAmeneties.services.ts";

import type { Request, Response } from "express";
import {
    createController,
    deleteController,
    getByIdController,
    updateController,
    getAllController
} from "../../utils/controllerFunctions.ts";

export const createRoomAmenetyController = (req: Request, res: Response) =>
    createController(req, res, createRoomAmenetiesService, 'Room amenety data is required', 'Failed to create room amenety');

export const getAllRoomAmenetiesController = (res: Response) =>
    getAllController(res, getAllRoomAmenetiesService, 'Failed to retrieve room ameneties');

export const getRoomAmenetyByIdController = (req: Request, res: Response) =>
    getByIdController(req, res, getRoomAmenetiesByIdService, 'Room amenety not found', 'Failed to retrieve room amenety');

export const updateRoomAmenetyController = (req: Request, res: Response) =>
    updateController(req, res, updateRoomAmenetiesService, 'Room amenety not found', 'Failed to update room amenety');

export const deleteRoomAmenetyController = (req: Request, res: Response) =>
    deleteController(req, res, deleteRoomAmenetiesService, 'Failed to delete room amenety');
