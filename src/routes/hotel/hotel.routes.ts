import {
    createHotelController,
    deleteHotelController,
    getHotelByIdController,
    getHotelsController,
    updateHotelController,
} from '../../controller/hotel/hotel.controller.ts';
import { validateRequestBody } from '../../middlewares/validation/validator.middleware.ts';
import { HotelSchema } from '../../validations/zodValidation.ts';
import { Router } from 'express';

const router = Router();

router.post('/', validateRequestBody(HotelSchema), createHotelController);

router.get('/', getHotelsController);

router.get('/:id', getHotelByIdController);

router.put('/:id', validateRequestBody(HotelSchema), updateHotelController);

router.delete('/:id', deleteHotelController);

export default router;