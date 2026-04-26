import {
    createFeedbackController,
    deleteFeedbackController,
    getAllFeedbackController,
    getFeedbackByIdController,
    updateFeedbackController,
} from '../../controller/feedback/feedback.controller';
import { validateRequestBody } from '../../middlewares/validations/handleRequestValidation';
import { FeedbackSchema } from '../../validations/zodValidation';
import { Router } from 'express';

const router = Router();

router.post('/', validateRequestBody(FeedbackSchema), createFeedbackController);

router.get('/', getAllFeedbackController);

router.get('/:id', getFeedbackByIdController);

router.put('/:id', validateRequestBody(FeedbackSchema), updateFeedbackController);

router.delete('/:id', deleteFeedbackController);

export default router;