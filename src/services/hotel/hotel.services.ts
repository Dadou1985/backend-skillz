import {
    createHotel,
    deleteHotel,
    getHotelById,
    getHotels,
    updateHotel,
} from "../../models/hotel/hotel.repository.ts";

export async function createHotelService(data: Parameters<typeof createHotel>[0]) {
    return await createHotel(data);
}

export async function getHotelsService() {
    return await getHotels();
}

export async function getHotelByIdService(id: Parameters<typeof getHotelById>[0]) {
    return await getHotelById(id);
}

export async function updateHotelService(
    id: Parameters<typeof updateHotel>[0],
    data: Parameters<typeof updateHotel>[1]
) {
    return await updateHotel(id, data);
}

export async function deleteHotelService(id: Parameters<typeof deleteHotel>[0]) {
    return await deleteHotel(id);
}