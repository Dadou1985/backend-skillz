import {
    createRoomAmenety,
    deleteRoomAmenety,
    getRoomAmeneties,
    getRoomAmenetyById,
    updateRoomAmenety,
} from "../../models/amenety/roomAmeneties.repository.ts";

export async function createRoomAmenetiesService(data: Parameters<typeof createRoomAmenety>[0]) {
    return await createRoomAmenety(data);
}

export async function getAllRoomAmenetiesService() {
    return await getRoomAmeneties();
}

export async function getRoomAmenetiesByIdService(id: Parameters<typeof getRoomAmenetyById>[0]) {
    return await getRoomAmenetyById(id);
}

export async function updateRoomAmenetiesService(
    id: Parameters<typeof updateRoomAmenety>[0],
    data: Parameters<typeof updateRoomAmenety>[1]
) {
    return await updateRoomAmenety(id, data);
}

export async function deleteRoomAmenetiesService(id: Parameters<typeof deleteRoomAmenety>[0]) {
    return await deleteRoomAmenety(id);
}