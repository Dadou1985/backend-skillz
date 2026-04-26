import {
    createFeedbackService,
    deleteFeedbackService,
    getAllFeedbackService,
    getFeedbackByIdService,
    updateFeedbackService,
} from '../../services/feedback/feedback.services';

import type { Request, Response } from 'express';
import {
    createController,
    deleteController,
    getByIdController,
    updateController,
} from '../../utils/controllerFunctions';

export const createFeedbackController = (req: Request, res: Response) =>
    createController(req, res, createFeedbackService, 'Feedback data is required', 'Failed to create feedback');

export const getAllFeedbackController = (req: Request, res: Response) =>
    getByIdController(req, res, getAllFeedbackService, 'Failed to retrieve feedbacks', 'Failed to retrieve feedbacks');

export const getFeedbackByIdController = (req: Request, res: Response) =>
    getByIdController(req, res, getFeedbackByIdService, 'Feedback not found', 'Failed to retrieve feedback');

export const updateFeedbackController = (req: Request, res: Response) =>
    updateController(req, res, updateFeedbackService, 'Feedback not found', 'Failed to update feedback');

export const deleteFeedbackController = (req: Request, res: Response) =>
    deleteController(req, res, deleteFeedbackService, 'Failed to delete feedback');
