import {
    createAmenetyController,
    deleteAmenetyController,
    getAmenetyByIdController,
    getAmenetiesController,
    updateAmenetyController,
} from '../../controller/amenety/amenety.controller.ts';
import { validateRequestBody } from '../../middlewares/validation/validator.middleware.ts';
import { AmenetySchema } from '../../validations/zodValidation.ts';
import { Router } from 'express';

const router = Router();

router.post('/', validateRequestBody(AmenetySchema), createAmenetyController);

router.get('/', getAmenetiesController);

router.get('/:id', getAmenetyByIdController);

router.put('/:id', validateRequestBody(AmenetySchema), updateAmenetyController);

router.delete('/:id', deleteAmenetyController);

export default router;