import {
    createRoomAmenetyController,
    deleteRoomAmenetyController,
    getAllRoomAmenetiesController,
    getRoomAmenetyByIdController,
    updateRoomAmenetyController,
} from '../../controller/amenety/roomAmeneties.controller.ts';
import { validateRequestBody } from '../../middlewares/validation/validator.middleware.ts';
import { RoomAmenetiesSchema } from '../../validations/zodValidation.ts';
import { Router } from 'express';

const router = Router();

router.post('/', validateRequestBody(RoomAmenetiesSchema), createRoomAmenetyController);

router.get('/', getAllRoomAmenetiesController);

router.get('/:id', getRoomAmenetyByIdController);

router.put('/:id', validateRequestBody(RoomAmenetiesSchema), updateRoomAmenetyController);

router.delete('/:id', deleteRoomAmenetyController);

export default router;