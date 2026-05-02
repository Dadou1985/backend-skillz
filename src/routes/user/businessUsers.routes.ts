import {
    createBusinessUserController,
    deleteBusinessUserController,
    getBusinessUserByIdController,
    getBusinessUsersController,
    updateBusinessUserController,
} from '../../controller/user/businessUsers.controller.ts';
import { validateRequestBody } from '../../middlewares/validation/validator.middleware.ts';
import { BusinessUserSchema, BusinessUserUpdateSchema } from '../../validations/zodValidation.ts';
import { Router } from 'express';

const router = Router();

router.post('/', validateRequestBody(BusinessUserSchema), createBusinessUserController);

router.get('/', getBusinessUsersController);

router.get('/:id', getBusinessUserByIdController);

router.patch('/:id', validateRequestBody(BusinessUserUpdateSchema), updateBusinessUserController);

router.delete('/:id', deleteBusinessUserController);

export default router;

