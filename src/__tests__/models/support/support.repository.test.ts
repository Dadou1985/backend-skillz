import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockPrisma = {
    support: {
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
    createSupport,
    getSupports,
    getSupportById,
    updateSupport,
    deleteSupport,
} from '../../../models/support/support.repository';

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

describe('createSupport', () => {
    it('calls prisma.support.create with the provided data and returns the result', async () => {
        const inputData = {
            hotelName: 'Grand Hotel',
            hotel: { connect: { id: 'hotel-1' } },
            createdAt: new Date(),
            updatedAt: new Date(),
        } as any;
        mockPrisma.support.create.mockResolvedValue(mockSupport);

        const result = await createSupport(inputData);

        expect(mockPrisma.support.create).toHaveBeenCalledOnce();
        expect(mockPrisma.support.create).toHaveBeenCalledWith({ data: inputData });
        expect(result).toBe(mockSupport);
    });

    it('propagates errors from prisma.support.create', async () => {
        const inputData = { hotelName: 'Test' } as any;
        mockPrisma.support.create.mockRejectedValue(new Error('Insert failed'));

        await expect(createSupport(inputData)).rejects.toThrow('Insert failed');
    });
});

describe('getSupports', () => {
    it('calls prisma.support.findMany with no arguments and returns the list', async () => {
        const supports = [mockSupport, { ...mockSupport, id: 'support-2' }];
        mockPrisma.support.findMany.mockResolvedValue(supports);

        const result = await getSupports();

        expect(mockPrisma.support.findMany).toHaveBeenCalledOnce();
        expect(mockPrisma.support.findMany).toHaveBeenCalledWith();
        expect(result).toBe(supports);
    });

    it('returns empty array when no supports exist', async () => {
        mockPrisma.support.findMany.mockResolvedValue([]);

        const result = await getSupports();

        expect(result).toEqual([]);
    });

    it('propagates errors from prisma.support.findMany', async () => {
        mockPrisma.support.findMany.mockRejectedValue(new Error('DB error'));

        await expect(getSupports()).rejects.toThrow('DB error');
    });
});

describe('getSupportById', () => {
    it('calls prisma.support.findUnique with the correct where clause and returns the result', async () => {
        mockPrisma.support.findUnique.mockResolvedValue(mockSupport);

        const result = await getSupportById('support-1');

        expect(mockPrisma.support.findUnique).toHaveBeenCalledOnce();
        expect(mockPrisma.support.findUnique).toHaveBeenCalledWith({ where: { id: 'support-1' } });
        expect(result).toBe(mockSupport);
    });

    it('returns null when no support record is found', async () => {
        mockPrisma.support.findUnique.mockResolvedValue(null);

        const result = await getSupportById('nonexistent');

        expect(result).toBeNull();
    });
});

describe('updateSupport', () => {
    it('calls prisma.support.update with correct where and data, returns the result', async () => {
        const updateData = { adminSpeak: true } as any;
        const updatedSupport = { ...mockSupport, ...updateData };
        mockPrisma.support.update.mockResolvedValue(updatedSupport);

        const result = await updateSupport('support-1', updateData);

        expect(mockPrisma.support.update).toHaveBeenCalledOnce();
        expect(mockPrisma.support.update).toHaveBeenCalledWith({ where: { id: 'support-1' }, data: updateData });
        expect(result).toBe(updatedSupport);
    });

    it('propagates errors from prisma.support.update', async () => {
        mockPrisma.support.update.mockRejectedValue(new Error('Support not found'));

        await expect(updateSupport('nonexistent', {} as any)).rejects.toThrow('Support not found');
    });
});

describe('deleteSupport', () => {
    it('calls prisma.support.delete with the correct where clause and returns the result', async () => {
        mockPrisma.support.delete.mockResolvedValue(mockSupport);

        const result = await deleteSupport('support-1');

        expect(mockPrisma.support.delete).toHaveBeenCalledOnce();
        expect(mockPrisma.support.delete).toHaveBeenCalledWith({ where: { id: 'support-1' } });
        expect(result).toBe(mockSupport);
    });

    it('propagates errors from prisma.support.delete', async () => {
        mockPrisma.support.delete.mockRejectedValue(new Error('Support not found'));

        await expect(deleteSupport('nonexistent')).rejects.toThrow('Support not found');
    });
});