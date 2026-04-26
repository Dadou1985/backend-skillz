import {
    createCheckListItemController,
    deleteCheckListItemController,
    getCheckListItemsController,
    updateCheckListItemController,
    getCheckListItemByIdController,
} from '../../controller/checkList/checkListItem.controller';
import { validateRequestBody } from '../../middlewares/validations/handleRequestValidation';
import { CheckListItemSchema } from '../../validations/zodValidation';
import { Router } from 'express';

const router = Router();

router.post('/', validateRequestBody(CheckListItemSchema), createCheckListItemController);

router.get('/', getCheckListItemsController);

router.get('/:id', getCheckListItemByIdController);

router.put('/:id', validateRequestBody(CheckListItemSchema), updateCheckListItemController);

router.delete('/:id', deleteCheckListItemController);

export default router;