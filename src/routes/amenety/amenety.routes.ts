import {
    createAmenetyController,
    deleteAmenetyController,
    getAmenetyByIdController,
    getAmenetiesController,
    updateAmenetyController,
} from '../../controller/amenety/amenety.controller.ts';
import { validateRequestBody } from '../../middlewares/validation/validator.middleware.ts';
import { AmenetySchema, AmenetyUpdateSchema } from '../../validations/zodValidation.ts';
import { Router } from 'express';

const router = Router();

router.post('/', validateRequestBody(AmenetySchema), createAmenetyController);

router.get('/', getAmenetiesController);

router.get('/:id', getAmenetyByIdController);

router.patch('/:id', validateRequestBody(AmenetyUpdateSchema), updateAmenetyController);

router.delete('/:id', deleteAmenetyController);

export default router;