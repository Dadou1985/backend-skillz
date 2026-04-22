import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../models/support/support.repository', () => ({
    createSupport: vi.fn(),
    getSupports: vi.fn(),
    getSupportById: vi.fn(),
    updateSupport: vi.fn(),
    deleteSupport: vi.fn(),
}));

import * as supportRepo from '../../models/support/support.repository';
import {
    createSupportService,
    getSupportsService,
    getSupportByIdService,
    updateSupportService,
    deleteSupportService,
} from '../../services/support/support.services';

const mockSupport = {
    id: 'support-1',
    hotelId: 'hotel-1',
    hotelName: 'Grand Hotel',
    pricingModel: 'BASIC',
    checkoutDate: new Date('2024-06-01'),
    adminSpeak: false,
    status: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
};

beforeEach(() => {
    vi.clearAllMocks();
});

describe('createSupportService', () => {
    it('calls createSupport with the provided data and returns the result', async () => {
        const inputData = { hotelId: 'hotel-1', hotelName: 'Grand Hotel' } as any;
        vi.mocked(supportRepo.createSupport).mockResolvedValue(mockSupport as any);

        const result = await createSupportService(inputData);

        expect(supportRepo.createSupport).toHaveBeenCalledOnce();
        expect(supportRepo.createSupport).toHaveBeenCalledWith(inputData);
        expect(result).toBe(mockSupport);
    });

    it('propagates errors thrown by createSupport', async () => {
        const inputData = { hotelId: 'hotel-1' } as any;
        vi.mocked(supportRepo.createSupport).mockRejectedValue(new Error('Insert failed'));

        await expect(createSupportService(inputData)).rejects.toThrow('Insert failed');
    });
});

describe('getSupportsService', () => {
    it('calls getSupports with no arguments and returns the list', async () => {
        const supports = [mockSupport, { ...mockSupport, id: 'support-2' }];
        vi.mocked(supportRepo.getSupports).mockResolvedValue(supports as any);

        const result = await getSupportsService();

        expect(supportRepo.getSupports).toHaveBeenCalledOnce();
        expect(supportRepo.getSupports).toHaveBeenCalledWith();
        expect(result).toBe(supports);
    });

    it('returns an empty array when no supports exist', async () => {
        vi.mocked(supportRepo.getSupports).mockResolvedValue([]);

        const result = await getSupportsService();

        expect(result).toEqual([]);
    });

    it('propagates errors thrown by getSupports', async () => {
        vi.mocked(supportRepo.getSupports).mockRejectedValue(new Error('Connection failed'));

        await expect(getSupportsService()).rejects.toThrow('Connection failed');
    });
});

describe('getSupportByIdService', () => {
    it('calls getSupportById with the provided id and returns the result', async () => {
        vi.mocked(supportRepo.getSupportById).mockResolvedValue(mockSupport as any);

        const result = await getSupportByIdService('support-1');

        expect(supportRepo.getSupportById).toHaveBeenCalledOnce();
        expect(supportRepo.getSupportById).toHaveBeenCalledWith('support-1');
        expect(result).toBe(mockSupport);
    });

    it('returns null when support is not found', async () => {
        vi.mocked(supportRepo.getSupportById).mockResolvedValue(null);

        const result = await getSupportByIdService('nonexistent');

        expect(result).toBeNull();
    });

    it('propagates errors thrown by getSupportById', async () => {
        vi.mocked(supportRepo.getSupportById).mockRejectedValue(new Error('DB error'));

        await expect(getSupportByIdService('support-1')).rejects.toThrow('DB error');
    });
});

describe('updateSupportService', () => {
    it('calls updateSupport with the correct id and data, returns the result', async () => {
        const updateData = { status: false } as any;
        const updatedSupport = { ...mockSupport, ...updateData };
        vi.mocked(supportRepo.updateSupport).mockResolvedValue(updatedSupport as any);

        const result = await updateSupportService('support-1', updateData);

        expect(supportRepo.updateSupport).toHaveBeenCalledOnce();
        expect(supportRepo.updateSupport).toHaveBeenCalledWith('support-1', updateData);
        expect(result).toBe(updatedSupport);
    });

    it('propagates errors thrown by updateSupport', async () => {
        vi.mocked(supportRepo.updateSupport).mockRejectedValue(new Error('Support not found'));

        await expect(updateSupportService('nonexistent', {} as any)).rejects.toThrow('Support not found');
    });

    it('passes partial update data through unchanged', async () => {
        const partialData = { adminSpeak: true } as any;
        vi.mocked(supportRepo.updateSupport).mockResolvedValue(mockSupport as any);

        await updateSupportService('support-1', partialData);

        expect(supportRepo.updateSupport).toHaveBeenCalledWith('support-1', partialData);
    });
});

describe('deleteSupportService', () => {
    it('calls deleteSupport with the provided id and returns the result', async () => {
        vi.mocked(supportRepo.deleteSupport).mockResolvedValue(mockSupport as any);

        const result = await deleteSupportService('support-1');

        expect(supportRepo.deleteSupport).toHaveBeenCalledOnce();
        expect(supportRepo.deleteSupport).toHaveBeenCalledWith('support-1');
        expect(result).toBe(mockSupport);
    });

    it('propagates errors thrown by deleteSupport', async () => {
        vi.mocked(supportRepo.deleteSupport).mockRejectedValue(new Error('Support not found'));

        await expect(deleteSupportService('nonexistent')).rejects.toThrow('Support not found');
    });
});