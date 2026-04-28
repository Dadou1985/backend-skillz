import {
    createHotelService,
    deleteHotelService,
    getHotelByIdService,
    getHotelsService,
    updateHotelService,
} from "../../services/hotel/hotel.services.ts";

import type { Request, Response } from "express";
import {
    createController,
    deleteController,
    getAllController,
    getByIdController,
    updateController,
} from "../../utils/controllerFunctions.ts";

export const createHotelController = (req: Request, res: Response) =>
    createController(req, res, createHotelService, 'Hotel data is required', 'Failed to create hotel');

export const getHotelsController = (res: Response) =>
    getAllController(res, getHotelsService, 'Failed to retrieve hotels');

export const getHotelByIdController = (req: Request, res: Response) =>
    getByIdController(req, res, getHotelByIdService, 'Hotel not found', 'Failed to retrieve hotel');

export const updateHotelController = (req: Request, res: Response) =>
    updateController(req, res, updateHotelService, 'Hotel not found', 'Failed to update hotel');

export const deleteHotelController = (req: Request, res: Response) =>
    deleteController(req, res, deleteHotelService, 'Failed to delete hotel');
