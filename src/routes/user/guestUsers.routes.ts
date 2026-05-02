import {
    createGuestUserController,
    deleteGuestUserController,
    getGuestUsersController,
    getGuestUserByIdController,
    updateGuestUserController,
} from '../../controller/user/guestUsers.controller.ts';
import { validateRequestBody } from '../../middlewares/validation/validator.middleware.ts';
import { GuestUserSchema, GuestUserUpdateSchema } from '../../validations/zodValidation.ts';
import { Router } from 'express';

const router = Router();

router.post('/', validateRequestBody(GuestUserSchema), createGuestUserController);

router.get('/', getGuestUsersController);

router.get('/:id', getGuestUserByIdController);

router.patch('/:id', validateRequestBody(GuestUserUpdateSchema), updateGuestUserController);

router.delete('/:id', deleteGuestUserController);

export default router;