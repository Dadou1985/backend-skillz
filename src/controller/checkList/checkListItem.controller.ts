import {
    createCheckListItemService,
    deleteCheckListItemService,
    getCheckListItemByIdService,
    getCheckListItemsService,
    updateCheckListItemService,
} from '../../services/checkList/checkListItem.services';
import {
    createController,
    deleteController,
    getByIdController,
    updateController,
} from '../../utils/controllerFunctions';
import type { Request, Response } from 'express';

export const createCheckListItemController = (req: Request, res: Response) =>
    createController(req, res, createCheckListItemService, 'CheckListItem data is required', 'Failed to create checkListItem');

export const getCheckListItemsController = (req: Request, res: Response) =>
    getByIdController(req, res, getCheckListItemsService, 'Failed to retrieve checkListItems', 'Failed to retrieve checkListItems');

export const getCheckListItemByIdController = (req: Request, res: Response) =>
    getByIdController(req, res, getCheckListItemByIdService, 'CheckListItem not found', 'Failed to retrieve checkListItem');

export const updateCheckListItemController = (req: Request, res: Response) =>
    updateController(req, res, updateCheckListItemService, 'CheckListItem not found', 'Failed to update checkListItem');

export const deleteCheckListItemController = (req: Request, res: Response) =>
    deleteController(req, res, deleteCheckListItemService, 'Failed to delete checkListItem');