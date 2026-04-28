import {
    createSupportController,
    deleteSupportController,
    getSupportsController,
    getSupportByIdController,
    updateSupportController,
} from '../../controller/support/support.controller.ts';
import { validateRequestBody } from '../../middlewares/validations/handleRequestValidation.ts';
import { SupportSchema } from '../../validations/zodValidation.ts';
import { Router } from 'express';

const router = Router();

router.post('/', validateRequestBody(SupportSchema), createSupportController);

router.get('/', getSupportsController);

router.get('/:id', getSupportByIdController);

router.put('/:id', validateRequestBody(SupportSchema), updateSupportController);

router.delete('/:id', deleteSupportController);

export default router;