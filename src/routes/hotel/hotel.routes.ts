import {
    createHotelController,
    deleteHotelController,
    getHotelByIdController,
    getHotelsController,
    updateHotelController,
} from '../../controller/hotel/hotel.controller.ts';
import { validateRequestBody } from '../../middlewares/validation/validator.middleware.ts';
import { HotelSchema, HotelUpdateSchema } from '../../validations/zodValidation.ts';
import { Router } from 'express';

const router = Router();

router.post('/', validateRequestBody(HotelSchema), createHotelController);

router.get('/', getHotelsController);

router.get('/:id', getHotelByIdController);

router.patch('/:id', validateRequestBody(HotelUpdateSchema), updateHotelController);

router.delete('/:id', deleteHotelController);

export default router;