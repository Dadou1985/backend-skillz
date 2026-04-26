import {
    createAmenetyController,
    deleteAmenetyController,
    getAmenetyByIdController,
    getAmenetiesController,
    updateAmenetyController,
} from '../../controller/amenety/amenety.controller';
import { validateRequestBody } from '../../middlewares/validations/handleRequestValidation';
import { AmenetySchema } from '../../validations/zodValidation';
import { Router } from 'express';

const router = Router();

router.post('/', validateRequestBody(AmenetySchema), createAmenetyController);

router.get('/', getAmenetiesController);

router.get('/:id', getAmenetyByIdController);

router.put('/:id', validateRequestBody(AmenetySchema), updateAmenetyController);

router.delete('/:id', deleteAmenetyController);

export default router;