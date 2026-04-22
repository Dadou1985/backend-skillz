import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockPrisma = {
    hotel: {
        create: vi.fn(),
        findMany: vi.fn(),
        findUnique: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
    },
};

vi.mock('../../../config/prisma', () => ({
    prisma: mockPrisma,
}));

import {
    createHotel,
    getHotels,
    getHotelById,
    updateHotel,
    deleteHotel,
} from '../../../models/hotel/hotel.repository';

const mockHotel = {
    id: 'hotel-1',
    name: 'Grand Hotel',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
};

beforeEach(() => {
    vi.clearAllMocks();
});

describe('createHotel', () => {
    it('calls prisma.hotel.create with the provided data and returns the result', async () => {
        const inputData = { name: 'Grand Hotel', createdAt: new Date(), updatedAt: new Date() } as any;
        mockPrisma.hotel.create.mockResolvedValue(mockHotel);

        const result = await createHotel(inputData);

        expect(mockPrisma.hotel.create).toHaveBeenCalledOnce();
        expect(mockPrisma.hotel.create).toHaveBeenCalledWith({ data: inputData });
        expect(result).toBe(mockHotel);
    });

    it('propagates errors from prisma.hotel.create', async () => {
        const inputData = { name: 'Duplicate Hotel' } as any;
        mockPrisma.hotel.create.mockRejectedValue(new Error('Unique constraint failed'));

        await expect(createHotel(inputData)).rejects.toThrow('Unique constraint failed');
    });
});

describe('getHotels', () => {
    it('calls prisma.hotel.findMany with no arguments and returns the list', async () => {
        const hotels = [mockHotel, { ...mockHotel, id: 'hotel-2', name: 'Budget Inn' }];
        mockPrisma.hotel.findMany.mockResolvedValue(hotels);

        const result = await getHotels();

        expect(mockPrisma.hotel.findMany).toHaveBeenCalledOnce();
        expect(mockPrisma.hotel.findMany).toHaveBeenCalledWith();
        expect(result).toBe(hotels);
    });

    it('returns empty array when no hotels exist', async () => {
        mockPrisma.hotel.findMany.mockResolvedValue([]);

        const result = await getHotels();

        expect(result).toEqual([]);
    });

    it('propagates errors from prisma.hotel.findMany', async () => {
        mockPrisma.hotel.findMany.mockRejectedValue(new Error('Connection lost'));

        await expect(getHotels()).rejects.toThrow('Connection lost');
    });
});

describe('getHotelById', () => {
    it('calls prisma.hotel.findUnique with the correct where clause and returns the result', async () => {
        mockPrisma.hotel.findUnique.mockResolvedValue(mockHotel);

        const result = await getHotelById('hotel-1');

        expect(mockPrisma.hotel.findUnique).toHaveBeenCalledOnce();
        expect(mockPrisma.hotel.findUnique).toHaveBeenCalledWith({ where: { id: 'hotel-1' } });
        expect(result).toBe(mockHotel);
    });

    it('returns null when no hotel is found', async () => {
        mockPrisma.hotel.findUnique.mockResolvedValue(null);

        const result = await getHotelById('nonexistent');

        expect(result).toBeNull();
    });
});

describe('updateHotel', () => {
    it('calls prisma.hotel.update with correct where and data, returns the result', async () => {
        const updateData = { name: 'Luxury Hotel' } as any;
        const updatedHotel = { ...mockHotel, ...updateData };
        mockPrisma.hotel.update.mockResolvedValue(updatedHotel);

        const result = await updateHotel('hotel-1', updateData);

        expect(mockPrisma.hotel.update).toHaveBeenCalledOnce();
        expect(mockPrisma.hotel.update).toHaveBeenCalledWith({ where: { id: 'hotel-1' }, data: updateData });
        expect(result).toBe(updatedHotel);
    });

    it('propagates errors from prisma.hotel.update', async () => {
        mockPrisma.hotel.update.mockRejectedValue(new Error('Hotel not found'));

        await expect(updateHotel('nonexistent', {} as any)).rejects.toThrow('Hotel not found');
    });
});

describe('deleteHotel', () => {
    it('calls prisma.hotel.delete with the correct where clause and returns the result', async () => {
        mockPrisma.hotel.delete.mockResolvedValue(mockHotel);

        const result = await deleteHotel('hotel-1');

        expect(mockPrisma.hotel.delete).toHaveBeenCalledOnce();
        expect(mockPrisma.hotel.delete).toHaveBeenCalledWith({ where: { id: 'hotel-1' } });
        expect(result).toBe(mockHotel);
    });

    it('propagates errors from prisma.hotel.delete', async () => {
        mockPrisma.hotel.delete.mockRejectedValue(new Error('Hotel not found'));

        await expect(deleteHotel('nonexistent')).rejects.toThrow('Hotel not found');
    });
});