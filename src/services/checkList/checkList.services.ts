import {
    createCheckList,
    deleteCheckList,
    getCheckListById,
    getCheckLists,
    updateCheckList,
} from '../../models/checkList/checkList.repository';

export async function createCheckListService(data: Parameters<typeof createCheckList>[0]) {
    return await createCheckList(data);
}

export async function getCheckListsService() {
    return await getCheckLists();
}

export async function getCheckListByIdService(id: Parameters<typeof getCheckListById>[0]) {
    return await getCheckListById(id);
}

export async function updateCheckListService(
    id: Parameters<typeof updateCheckList>[0],
    data: Parameters<typeof updateCheckList>[1]
) {
    return await updateCheckList(id, data);
}

export async function deleteCheckListService(id: Parameters<typeof deleteCheckList>[0]) {
    return await deleteCheckList(id);
}