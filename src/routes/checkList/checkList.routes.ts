import {
    createCheckListController,
    deleteCheckListController,
    getCheckListByIdController,
    getCheckListsController,
    updateCheckListController,
} from '../../controller/checkList/checkList.controller.ts';
import { validateRequestBody } from '../../middlewares/validation/validator.middleware.ts';
import { CheckListSchema, CheckListUpdateSchema } from '../../validations/zodValidation.ts';
import { Router } from 'express';

const router = Router();

router.post('/', validateRequestBody(CheckListSchema), createCheckListController);

router.get('/', getCheckListsController);

router.get('/:id', getCheckListByIdController);

router.patch('/:id', validateRequestBody(CheckListUpdateSchema), updateCheckListController);

router.delete('/:id', deleteCheckListController);

export default router;