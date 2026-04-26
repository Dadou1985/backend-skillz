import {
    createRoomAmenetyController,
    deleteRoomAmenetyController,
    getAllRoomAmenetiesController,
    getRoomAmenetyByIdController,
    updateRoomAmenetyController,
} from '../../controller/amenety/roomAmeneties.controller';
import { validateRequestBody } from '../../middlewares/validations/handleRequestValidation';
import { RoomAmenetiesSchema } from '../../validations/zodValidation';
import { Router } from 'express';

const router = Router();

router.post('/', validateRequestBody(RoomAmenetiesSchema), createRoomAmenetyController);

router.get('/', getAllRoomAmenetiesController);

router.get('/:id', getRoomAmenetyByIdController);

router.put('/:id', validateRequestBody(RoomAmenetiesSchema), updateRoomAmenetyController);

router.delete('/:id', deleteRoomAmenetyController);

export default router;