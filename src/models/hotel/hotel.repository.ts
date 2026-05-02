import { prisma } from "../../config/prisma.ts";
import type { HotelCreateInput } from "../../../prisma/prisma/models/Hotel.ts";

export async function createHotel(data: HotelCreateInput) {
    return await prisma.hotel.create({ data });
}

export async function getHotels() {
    return await prisma.hotel.findMany();
}

export async function getHotelById(id: string) {
    return await prisma.hotel.findUnique({ where: { id } });
}

export async function updateHotel(id: string, data: Partial<HotelCreateInput>) {
    return await prisma.hotel.update({ where: { id }, data });
}

export async function deleteHotel(id: string) {
    return await prisma.hotel.delete({ where: { id } });
}