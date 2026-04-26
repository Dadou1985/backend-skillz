import {
    createCheckListItem,
    deleteCheckListItem,
    getCheckListItems,
    getCheckListItemById,
    updateCheckListItem
} from '../../models/checkList/checkListItem.repository';

export async function createCheckListItemService(data: Parameters<typeof createCheckListItem>[0]) {
    return await createCheckListItem(data);
}

export async function getCheckListItemsService() {
    return await getCheckListItems();
}

export async function getCheckListItemByIdService(id: Parameters<typeof getCheckListItemById>[0]) {
    return await getCheckListItemById(id);
}

export async function updateCheckListItemService(
    id: Parameters<typeof updateCheckListItem>[0],
    data: Parameters<typeof updateCheckListItem>[1]
) {
    return await updateCheckListItem(id, data);
}

export async function deleteCheckListItemService(id: Parameters<typeof deleteCheckListItem>[0]) {
    return await deleteCheckListItem(id);
}