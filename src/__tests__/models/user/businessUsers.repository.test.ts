import { describe, it, expect, vi, beforeEach } from 'vitest';

const safeBusinessUserSelect = {
    id: true,
    adminStatus: true,
    email: true,
    hotelId: true,
    username: true,
    createdAt: true,
    updatedAt: true,
    hotel: true,
};

const mockPrisma = {
    businessUser: {
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
    createBusinessUser,
    getBusinessUsers,
    getBusinessUserById,
    updateBusinessUser,
    deleteBusinessUser,
} from '../../../models/user/businessUsers.repository';

// Safe mock (no password field)
const mockBusinessUser = {
    id: 'user-1',
    adminStatus: false,
    email: 'admin@hotel.com',
    hotelId: 'hotel-1',
    username: 'hotelAdmin',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    hotel: null,
};

beforeEach(() => {
    vi.clearAllMocks();
});

describe('createBusinessUser', () => {
    it('calls prisma.businessUser.create with data and safeSelect, returns the safe user', async () => {
        const inputData = {
            email: 'admin@hotel.com',
            username: 'hotelAdmin',
            password: 'hashedSecret',
            hotel: { connect: { id: 'hotel-1' } },
            createdAt: new Date(),
            updatedAt: new Date(),
        } as any;
        mockPrisma.businessUser.create.mockResolvedValue(mockBusinessUser);

        const result = await createBusinessUser(inputData);

        expect(mockPrisma.businessUser.create).toHaveBeenCalledOnce();
        expect(mockPrisma.businessUser.create).toHaveBeenCalledWith({
            data: inputData,
            select: safeBusinessUserSelect,
        });
        expect(result).toBe(mockBusinessUser);
        // Confirm the returned value has no password field
        expect((result as any).password).toBeUndefined();
    });

    it('propagates errors from prisma.businessUser.create', async () => {
        const inputData = { email: 'dup@hotel.com' } as any;
        mockPrisma.businessUser.create.mockRejectedValue(new Error('Unique constraint violation'));

        await expect(createBusinessUser(inputData)).rejects.toThrow('Unique constraint violation');
    });
});

describe('getBusinessUsers', () => {
    it('calls prisma.businessUser.findMany with safeSelect and returns the list', async () => {
        const users = [mockBusinessUser, { ...mockBusinessUser, id: 'user-2' }];
        mockPrisma.businessUser.findMany.mockResolvedValue(users);

        const result = await getBusinessUsers();

        expect(mockPrisma.businessUser.findMany).toHaveBeenCalledOnce();
        expect(mockPrisma.businessUser.findMany).toHaveBeenCalledWith({ select: safeBusinessUserSelect });
        expect(result).toBe(users);
    });

    it('returns empty array when no business users exist', async () => {
        mockPrisma.businessUser.findMany.mockResolvedValue([]);

        const result = await getBusinessUsers();

        expect(result).toEqual([]);
    });

    it('propagates errors from prisma.businessUser.findMany', async () => {
        mockPrisma.businessUser.findMany.mockRejectedValue(new Error('DB unavailable'));

        await expect(getBusinessUsers()).rejects.toThrow('DB unavailable');
    });
});

describe('getBusinessUserById', () => {
    it('calls prisma.businessUser.findUnique with where clause and safeSelect, returns the safe user', async () => {
        mockPrisma.businessUser.findUnique.mockResolvedValue(mockBusinessUser);

        const result = await getBusinessUserById('user-1');

        expect(mockPrisma.businessUser.findUnique).toHaveBeenCalledOnce();
        expect(mockPrisma.businessUser.findUnique).toHaveBeenCalledWith({
            where: { id: 'user-1' },
            select: safeBusinessUserSelect,
        });
        expect(result).toBe(mockBusinessUser);
    });

    it('returns null when no user is found', async () => {
        mockPrisma.businessUser.findUnique.mockResolvedValue(null);

        const result = await getBusinessUserById('nonexistent');

        expect(result).toBeNull();
    });
});

describe('updateBusinessUser', () => {
    it('calls prisma.businessUser.update with where, data and safeSelect, returns the safe user', async () => {
        const updateData = { username: 'newAdmin' } as any;
        const updatedUser = { ...mockBusinessUser, ...updateData };
        mockPrisma.businessUser.update.mockResolvedValue(updatedUser);

        const result = await updateBusinessUser('user-1', updateData);

        expect(mockPrisma.businessUser.update).toHaveBeenCalledOnce();
        expect(mockPrisma.businessUser.update).toHaveBeenCalledWith({
            where: { id: 'user-1' },
            data: updateData,
            select: safeBusinessUserSelect,
        });
        expect(result).toBe(updatedUser);
    });

    it('propagates errors from prisma.businessUser.update', async () => {
        mockPrisma.businessUser.update.mockRejectedValue(new Error('User not found'));

        await expect(updateBusinessUser('nonexistent', {} as any)).rejects.toThrow('User not found');
    });
});

describe('deleteBusinessUser', () => {
    it('calls prisma.businessUser.delete with where and safeSelect, returns the safe user', async () => {
        mockPrisma.businessUser.delete.mockResolvedValue(mockBusinessUser);

        const result = await deleteBusinessUser('user-1');

        expect(mockPrisma.businessUser.delete).toHaveBeenCalledOnce();
        expect(mockPrisma.businessUser.delete).toHaveBeenCalledWith({
            where: { id: 'user-1' },
            select: safeBusinessUserSelect,
        });
        expect(result).toBe(mockBusinessUser);
    });

    it('propagates errors from prisma.businessUser.delete', async () => {
        mockPrisma.businessUser.delete.mockRejectedValue(new Error('User not found'));

        await expect(deleteBusinessUser('nonexistent')).rejects.toThrow('User not found');
    });
});