import {
    createHotelController,
    deleteHotelController,
    getHotelController,
    getHotelsController,
    updateHotelController,
} from '../../controller/hotel/hotel.controller';
import { validateRequestBody } from '../../middlewares/validations/handleRequestValidation';
import { hotelSche}
import { Router } from 'express';

const router = Router();

router.post('/', createHotelController);