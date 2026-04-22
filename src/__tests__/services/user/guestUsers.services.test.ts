import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../../models/user/guestUsers.repository', () => ({
    createGuestUser: vi.fn(),
    getGuestUsers: vi.fn(),
    getGuestUserById: vi.fn(),
    updateGuestUser: vi.fn(),
    deleteGuestUser: vi.fn(),
}));

import * as guestUserRepo from '../../../models/user/guestUsers.repository';
import {
    createGuestUserService,
    getGuestUsersService,
    getGuestUserByIdService,
    updateGuestUserService,
    deleteGuestUserService,
} from '../../../services/user/guestUsers.services';

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

describe('createGuestUserService', () => {
    it('calls createGuestUser with the provided data and returns the result', async () => {
        const inputData = {
            name: 'John Doe',
            email: 'john@example.com',
            hotel: { connect: { id: 'hotel-1' } },
            createdAt: new Date(),
            updatedAt: new Date(),
        } as any;
        vi.mocked(guestUserRepo.createGuestUser).mockResolvedValue(mockGuestUser as any);

        const result = await createGuestUserService(inputData);

        expect(guestUserRepo.createGuestUser).toHaveBeenCalledOnce();
        expect(guestUserRepo.createGuestUser).toHaveBeenCalledWith(inputData);
        expect(result).toBe(mockGuestUser);
    });

    it('propagates errors thrown by createGuestUser', async () => {
        const inputData = { name: 'Jane' } as any;
        vi.mocked(guestUserRepo.createGuestUser).mockRejectedValue(new Error('Insert failed'));

        await expect(createGuestUserService(inputData)).rejects.toThrow('Insert failed');
    });
});

describe('getGuestUsersService', () => {
    it('calls getGuestUsers with no arguments and returns the list', async () => {
        const users = [mockGuestUser, { ...mockGuestUser, id: 'guest-2', name: 'Jane Doe' }];
        vi.mocked(guestUserRepo.getGuestUsers).mockResolvedValue(users as any);

        const result = await getGuestUsersService();

        expect(guestUserRepo.getGuestUsers).toHaveBeenCalledOnce();
        expect(guestUserRepo.getGuestUsers).toHaveBeenCalledWith();
        expect(result).toBe(users);
    });

    it('returns an empty array when no guest users exist', async () => {
        vi.mocked(guestUserRepo.getGuestUsers).mockResolvedValue([]);

        const result = await getGuestUsersService();

        expect(result).toEqual([]);
    });

    it('propagates errors thrown by getGuestUsers', async () => {
        vi.mocked(guestUserRepo.getGuestUsers).mockRejectedValue(new Error('DB unavailable'));

        await expect(getGuestUsersService()).rejects.toThrow('DB unavailable');
    });
});

describe('getGuestUserByIdService', () => {
    it('calls getGuestUserById with the provided id and returns the result', async () => {
        vi.mocked(guestUserRepo.getGuestUserById).mockResolvedValue(mockGuestUser as any);

        const result = await getGuestUserByIdService('guest-1');

        expect(guestUserRepo.getGuestUserById).toHaveBeenCalledOnce();
        expect(guestUserRepo.getGuestUserById).toHaveBeenCalledWith('guest-1');
        expect(result).toBe(mockGuestUser);
    });

    it('returns null when guest user is not found', async () => {
        vi.mocked(guestUserRepo.getGuestUserById).mockResolvedValue(null);

        const result = await getGuestUserByIdService('nonexistent');

        expect(result).toBeNull();
    });

    it('propagates errors thrown by getGuestUserById', async () => {
        vi.mocked(guestUserRepo.getGuestUserById).mockRejectedValue(new Error('Query failed'));

        await expect(getGuestUserByIdService('guest-1')).rejects.toThrow('Query failed');
    });
});

describe('updateGuestUserService', () => {
    it('calls updateGuestUser with the correct id and data, returns the result', async () => {
        const updateData = { name: 'Johnny Updated' } as any;
        const updatedUser = { ...mockGuestUser, ...updateData };
        vi.mocked(guestUserRepo.updateGuestUser).mockResolvedValue(updatedUser as any);

        const result = await updateGuestUserService('guest-1', updateData);

        expect(guestUserRepo.updateGuestUser).toHaveBeenCalledOnce();
        expect(guestUserRepo.updateGuestUser).toHaveBeenCalledWith('guest-1', updateData);
        expect(result).toBe(updatedUser);
    });

    it('propagates errors thrown by updateGuestUser', async () => {
        vi.mocked(guestUserRepo.updateGuestUser).mockRejectedValue(new Error('Guest not found'));

        await expect(updateGuestUserService('nonexistent', {} as any)).rejects.toThrow('Guest not found');
    });

    it('passes partial update data through unchanged', async () => {
        const partialData = { email: 'new@example.com' } as any;
        vi.mocked(guestUserRepo.updateGuestUser).mockResolvedValue(mockGuestUser as any);

        await updateGuestUserService('guest-1', partialData);

        expect(guestUserRepo.updateGuestUser).toHaveBeenCalledWith('guest-1', partialData);
    });
});

describe('deleteGuestUserService', () => {
    it('calls deleteGuestUser with the provided id and returns the result', async () => {
        vi.mocked(guestUserRepo.deleteGuestUser).mockResolvedValue(mockGuestUser as any);

        const result = await deleteGuestUserService('guest-1');

        expect(guestUserRepo.deleteGuestUser).toHaveBeenCalledOnce();
        expect(guestUserRepo.deleteGuestUser).toHaveBeenCalledWith('guest-1');
        expect(result).toBe(mockGuestUser);
    });

    it('propagates errors thrown by deleteGuestUser', async () => {
        vi.mocked(guestUserRepo.deleteGuestUser).mockRejectedValue(new Error('Guest not found'));

        await expect(deleteGuestUserService('nonexistent')).rejects.toThrow('Guest not found');
    });
});