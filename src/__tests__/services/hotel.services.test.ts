import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../models/hotel/hotel.repository', () => ({
    createHotel: vi.fn(),
    getHotels: vi.fn(),
    getHotelById: vi.fn(),
    updateHotel: vi.fn(),
    deleteHotel: vi.fn(),
}));

import * as hotelRepo from '../../models/hotel/hotel.repository';
import {
    createHotelService,
    getHotelsService,
    getHotelByIdService,
    updateHotelService,
    deleteHotelService,
} from '../../services/hotel/hotel.services';

const mockHotel = {
    id: 'hotel-1',
    name: 'Grand Hotel',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
};

beforeEach(() => {
    vi.clearAllMocks();
});

describe('createHotelService', () => {
    it('calls createHotel with the provided data and returns the result', async () => {
        const inputData = { name: 'Grand Hotel', createdAt: new Date(), updatedAt: new Date() } as any;
        vi.mocked(hotelRepo.createHotel).mockResolvedValue(mockHotel as any);

        const result = await createHotelService(inputData);

        expect(hotelRepo.createHotel).toHaveBeenCalledOnce();
        expect(hotelRepo.createHotel).toHaveBeenCalledWith(inputData);
        expect(result).toBe(mockHotel);
    });

    it('propagates errors thrown by createHotel', async () => {
        const inputData = { name: 'Hotel' } as any;
        vi.mocked(hotelRepo.createHotel).mockRejectedValue(new Error('Unique constraint failed'));

        await expect(createHotelService(inputData)).rejects.toThrow('Unique constraint failed');
    });
});

describe('getHotelsService', () => {
    it('calls getHotels with no arguments and returns the list', async () => {
        const hotels = [mockHotel, { ...mockHotel, id: 'hotel-2', name: 'Budget Inn' }];
        vi.mocked(hotelRepo.getHotels).mockResolvedValue(hotels as any);

        const result = await getHotelsService();

        expect(hotelRepo.getHotels).toHaveBeenCalledOnce();
        expect(hotelRepo.getHotels).toHaveBeenCalledWith();
        expect(result).toBe(hotels);
    });

    it('returns an empty array when no hotels exist', async () => {
        vi.mocked(hotelRepo.getHotels).mockResolvedValue([]);

        const result = await getHotelsService();

        expect(result).toEqual([]);
    });

    it('propagates errors thrown by getHotels', async () => {
        vi.mocked(hotelRepo.getHotels).mockRejectedValue(new Error('Connection failed'));

        await expect(getHotelsService()).rejects.toThrow('Connection failed');
    });
});

describe('getHotelByIdService', () => {
    it('calls getHotelById with the provided id and returns the result', async () => {
        vi.mocked(hotelRepo.getHotelById).mockResolvedValue(mockHotel as any);

        const result = await getHotelByIdService('hotel-1');

        expect(hotelRepo.getHotelById).toHaveBeenCalledOnce();
        expect(hotelRepo.getHotelById).toHaveBeenCalledWith('hotel-1');
        expect(result).toBe(mockHotel);
    });

    it('returns null when hotel is not found', async () => {
        vi.mocked(hotelRepo.getHotelById).mockResolvedValue(null);

        const result = await getHotelByIdService('nonexistent');

        expect(result).toBeNull();
    });

    it('propagates errors thrown by getHotelById', async () => {
        vi.mocked(hotelRepo.getHotelById).mockRejectedValue(new Error('DB error'));

        await expect(getHotelByIdService('hotel-1')).rejects.toThrow('DB error');
    });
});

describe('updateHotelService', () => {
    it('calls updateHotel with the correct id and data, returns the result', async () => {
        const updateData = { name: 'Updated Hotel' } as any;
        const updatedHotel = { ...mockHotel, ...updateData };
        vi.mocked(hotelRepo.updateHotel).mockResolvedValue(updatedHotel as any);

        const result = await updateHotelService('hotel-1', updateData);

        expect(hotelRepo.updateHotel).toHaveBeenCalledOnce();
        expect(hotelRepo.updateHotel).toHaveBeenCalledWith('hotel-1', updateData);
        expect(result).toBe(updatedHotel);
    });

    it('propagates errors thrown by updateHotel', async () => {
        vi.mocked(hotelRepo.updateHotel).mockRejectedValue(new Error('Hotel not found'));

        await expect(updateHotelService('nonexistent', {} as any)).rejects.toThrow('Hotel not found');
    });

    it('passes partial data through unchanged', async () => {
        const partialData = { updatedAt: new Date('2025-01-01') } as any;
        vi.mocked(hotelRepo.updateHotel).mockResolvedValue(mockHotel as any);

        await updateHotelService('hotel-1', partialData);

        expect(hotelRepo.updateHotel).toHaveBeenCalledWith('hotel-1', partialData);
    });
});

describe('deleteHotelService', () => {
    it('calls deleteHotel with the provided id and returns the result', async () => {
        vi.mocked(hotelRepo.deleteHotel).mockResolvedValue(mockHotel as any);

        const result = await deleteHotelService('hotel-1');

        expect(hotelRepo.deleteHotel).toHaveBeenCalledOnce();
        expect(hotelRepo.deleteHotel).toHaveBeenCalledWith('hotel-1');
        expect(result).toBe(mockHotel);
    });

    it('propagates errors thrown by deleteHotel', async () => {
        vi.mocked(hotelRepo.deleteHotel).mockRejectedValue(new Error('Hotel not found'));

        await expect(deleteHotelService('nonexistent')).rejects.toThrow('Hotel not found');
    });
});