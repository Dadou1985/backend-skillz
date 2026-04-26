import {
    createCheckListController,
    deleteCheckListController,
    getCheckListByIdController,
    getCheckListsController,
    updateCheckListController,
} from '../../controller/checkList/checkList.controller';
import { validateRequestBody } from '../../middlewares/validations/handleRequestValidation';
import { CheckListSchema } from '../../validations/zodValidation';
import { Router } from 'express';

const router = Router();

router.post('/', validateRequestBody(CheckListSchema), createCheckListController);

router.get('/', getCheckListsController);

router.get('/:id', getCheckListByIdController);

router.put('/:id', validateRequestBody(CheckListSchema), updateCheckListController);

router.delete('/:id', deleteCheckListController);

export default router;