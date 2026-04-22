import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockPrisma = {
    guestUser: {
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
    createGuestUser,
    getGuestUsers,
    getGuestUserById,
    updateGuestUser,
    deleteGuestUser,
} from '../../../models/user/guestUsers.repository';

const mockGuestUser = {
    id: 'guest-1',
    name: 'John Doe',
    email: 'john@example.com',
    hotelId: 'hotel-1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
};

beforeEach(() => {
    vi.clearAllMocks();
});

describe('createGuestUser', () => {
    it('calls prisma.guestUser.create with the provided data and returns the result', async () => {
        const inputData = {
            name: 'John Doe',
            email: 'john@example.com',
            hotel: { connect: { id: 'hotel-1' } },
            createdAt: new Date(),
            updatedAt: new Date(),
        } as any;
        mockPrisma.guestUser.create.mockResolvedValue(mockGuestUser);

        const result = await createGuestUser(inputData);

        expect(mockPrisma.guestUser.create).toHaveBeenCalledOnce();
        expect(mockPrisma.guestUser.create).toHaveBeenCalledWith({ data: inputData });
        expect(result).toBe(mockGuestUser);
    });

    it('propagates errors from prisma.guestUser.create', async () => {
        const inputData = { name: 'Test' } as any;
        mockPrisma.guestUser.create.mockRejectedValue(new Error('Insert failed'));

        await expect(createGuestUser(inputData)).rejects.toThrow('Insert failed');
    });
});

describe('getGuestUsers', () => {
    it('calls prisma.guestUser.findMany with no arguments and returns the list', async () => {
        const users = [mockGuestUser, { ...mockGuestUser, id: 'guest-2', name: 'Jane' }];
        mockPrisma.guestUser.findMany.mockResolvedValue(users);

        const result = await getGuestUsers();

        expect(mockPrisma.guestUser.findMany).toHaveBeenCalledOnce();
        expect(mockPrisma.guestUser.findMany).toHaveBeenCalledWith();
        expect(result).toBe(users);
    });

    it('returns empty array when no guest users exist', async () => {
        mockPrisma.guestUser.findMany.mockResolvedValue([]);

        const result = await getGuestUsers();

        expect(result).toEqual([]);
    });

    it('propagates errors from prisma.guestUser.findMany', async () => {
        mockPrisma.guestUser.findMany.mockRejectedValue(new Error('DB error'));

        await expect(getGuestUsers()).rejects.toThrow('DB error');
    });
});

describe('getGuestUserById', () => {
    it('calls prisma.guestUser.findUnique with the correct where clause and returns the result', async () => {
        mockPrisma.guestUser.findUnique.mockResolvedValue(mockGuestUser);

        const result = await getGuestUserById('guest-1');

        expect(mockPrisma.guestUser.findUnique).toHaveBeenCalledOnce();
        expect(mockPrisma.guestUser.findUnique).toHaveBeenCalledWith({ where: { id: 'guest-1' } });
        expect(result).toBe(mockGuestUser);
    });

    it('returns null when no guest user is found', async () => {
        mockPrisma.guestUser.findUnique.mockResolvedValue(null);

        const result = await getGuestUserById('nonexistent');

        expect(result).toBeNull();
    });
});

describe('updateGuestUser', () => {
    it('calls prisma.guestUser.update with correct where and data, returns the result', async () => {
        const updateData = { name: 'Updated Name' } as any;
        const updatedUser = { ...mockGuestUser, ...updateData };
        mockPrisma.guestUser.update.mockResolvedValue(updatedUser);

        const result = await updateGuestUser('guest-1', updateData);

        expect(mockPrisma.guestUser.update).toHaveBeenCalledOnce();
        expect(mockPrisma.guestUser.update).toHaveBeenCalledWith({ where: { id: 'guest-1' }, data: updateData });
        expect(result).toBe(updatedUser);
    });

    it('propagates errors from prisma.guestUser.update', async () => {
        mockPrisma.guestUser.update.mockRejectedValue(new Error('Guest not found'));

        await expect(updateGuestUser('nonexistent', {} as any)).rejects.toThrow('Guest not found');
    });
});

describe('deleteGuestUser', () => {
    it('calls prisma.guestUser.delete with the correct where clause and returns the result', async () => {
        mockPrisma.guestUser.delete.mockResolvedValue(mockGuestUser);

        const result = await deleteGuestUser('guest-1');

        expect(mockPrisma.guestUser.delete).toHaveBeenCalledOnce();
        expect(mockPrisma.guestUser.delete).toHaveBeenCalledWith({ where: { id: 'guest-1' } });
        expect(result).toBe(mockGuestUser);
    });

    it('propagates errors from prisma.guestUser.delete', async () => {
        mockPrisma.guestUser.delete.mockRejectedValue(new Error('Guest not found'));

        await expect(deleteGuestUser('nonexistent')).rejects.toThrow('Guest not found');
    });
});