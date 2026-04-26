import {
    createCheckListService,
    deleteCheckListService,
    getCheckListByIdService,
    getCheckListsService,
    updateCheckListService,
} from '../../services/checkList/checkList.services';
import {
    createController,
    deleteController,
    getByIdController,
    updateController,
} from '../../utils/controllerFunctions';

import type { Request, Response } from 'express';


export const createCheckListController = (req: Request, res: Response) =>
    createController(req, res, createCheckListService, 'CheckList data is required', 'Failed to create checkList');

export const getCheckListsController = (req: Request, res: Response) =>
    getByIdController(req, res, getCheckListsService, 'Failed to retrieve checkLists', 'Failed to retrieve checkLists');

export const getCheckListByIdController = (req: Request, res: Response) =>
    getByIdController(req, res, getCheckListByIdService, 'CheckList not found', 'Failed to retrieve checkList');

export const updateCheckListController = (req: Request, res: Response) =>
    updateController(req, res, updateCheckListService, 'CheckList not found', 'Failed to update checkList');

export const deleteCheckListController = (req: Request, res: Response) =>
    deleteController(req, res, deleteCheckListService, 'Failed to delete checkList');