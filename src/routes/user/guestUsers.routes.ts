import {
    createGuestUserController,
    deleteGuestUserController,
    getGuestUsersController,
    getGuestUserByIdController,
    updateGuestUserController,
} from '../../controller/user/guestUsers.controller.ts';
import { validateRequestBody } from '../../middlewares/validations/handleRequestValidation.ts';
import { GuestUserSchema } from '../../validations/zodValidation.ts';
import { Router } from 'express';

const router = Router();

router.post('/', validateRequestBody(GuestUserSchema), createGuestUserController);

router.get('/', getGuestUsersController);

router.get('/:id', getGuestUserByIdController);

router.put('/:id', validateRequestBody(GuestUserSchema), updateGuestUserController);

router.delete('/:id', deleteGuestUserController);

export default router;