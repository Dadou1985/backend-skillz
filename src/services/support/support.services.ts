import {
    createSupport,
    deleteSupport,
    getSupportById,
    getSupports,
    updateSupport
} from '../../models/support/support.repository';

export async function createSupportService(data: Parameters<typeof createSupport>[0]) {
    return await createSupport(data);
}

export async function getSupportsService() {
    return await getSupports();
}

export async function getSupportByIdService(id: Parameters<typeof getSupportById>[0]) {
    return await getSupportById(id);
}

export async function updateSupportService(
    id: Parameters<typeof updateSupport>[0],
    data: Parameters<typeof updateSupport>[1]
) {
    return await updateSupport(id, data);
}

export async function deleteSupportService(id: Parameters<typeof deleteSupport>[0]) {
    return await deleteSupport(id);
}