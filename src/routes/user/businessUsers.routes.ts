import {
    createBusinessUserController,
    deleteBusinessUserController,
    getBusinessUserByIdController,
    getBusinessUsersController,
} from '../../controller/user/businessUsers.controller';
import { validateRequestBody } from '../../middlewares/validations/handleRequestValidation';
import { BusinessUserSchema } from '../../validations/zodValidation';
import { Router } from 'express';

const router = Router();

router.post('/', validateRequestBody(BusinessUserSchema), createBusinessUserController);

router.get('/', getBusinessUsersController);

router.get('/:id', getBusinessUserByIdController);

router.delete('/:id', deleteBusinessUserController);

export default router;

