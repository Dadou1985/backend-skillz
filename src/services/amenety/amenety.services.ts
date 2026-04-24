import {
    createAmenety,
    deleteAmenety,
    getAmeneties,
    getAmenetyById,
} from "../../models/amenety/amenety.repository";

export async function createAmenetyService(data: Parameters<typeof createAmenety>[0]) {
    return await createAmenety(data);
}

export async function getAmenetiesService() {
    return await getAmeneties();
}

export async function getAmenetyByIdService(id: Parameters<typeof getAmenetyById>[0]) {
    return await getAmenetyById(id);
}

export async function deleteAmenetyService(id: Parameters<typeof deleteAmenety>[0]) {
    return await deleteAmenety(id);
}