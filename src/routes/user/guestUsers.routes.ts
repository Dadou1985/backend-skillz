import {
    createGuestUserController,
    deleteGuestUserController,
    getGuestUsersController,
    getGuestUserByIdController,
    updateGuestUserController,
} from '../../controller/user/guestUsers.controller';
import { validateRequestBody } from '../../middlewares/validations/handleRequestValidation';
import { GuestUserSchema } from '../../validations/zodValidation';
import { Router } from 'express';

const router = Router();

router.post('/', validateRequestBody(GuestUserSchema), createGuestUserController);

router.get('/', getGuestUsersController);

router.get('/:id', getGuestUserByIdController);

router.put('/:id', validateRequestBody(GuestUserSchema), updateGuestUserController);

router.delete('/:id', deleteGuestUserController);

export default router;