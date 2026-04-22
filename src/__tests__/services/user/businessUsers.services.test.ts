import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../../models/user/businessUsers.repository', () => ({
    createBusinessUser: vi.fn(),
    getBusinessUsers: vi.fn(),
    getBusinessUserById: vi.fn(),
    updateBusinessUser: vi.fn(),
    deleteBusinessUser: vi.fn(),
}));

import * as businessUserRepo from '../../../models/user/businessUsers.repository';
import {
    createBusinessUserService,
    getBusinessUsersService,
    getBusinessUserByIdService,
    updateBusinessUserService,
    deleteBusinessUserService,
} from '../../../services/user/businessUsers.services';

// Safe user (no password field, as per safeBusinessUserSelect in repository)
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

describe('createBusinessUserService', () => {
    it('calls createBusinessUser with the provided data and returns the safe user', async () => {
        const inputData = {
            email: 'admin@hotel.com',
            username: 'hotelAdmin',
            password: 'secret',
            hotel: { connect: { id: 'hotel-1' } },
            createdAt: new Date(),
            updatedAt: new Date(),
        } as any;
        vi.mocked(businessUserRepo.createBusinessUser).mockResolvedValue(mockBusinessUser as any);

        const result = await createBusinessUserService(inputData);

        expect(businessUserRepo.createBusinessUser).toHaveBeenCalledOnce();
        expect(businessUserRepo.createBusinessUser).toHaveBeenCalledWith(inputData);
        expect(result).toBe(mockBusinessUser);
    });

    it('propagates errors thrown by createBusinessUser', async () => {
        const inputData = { email: 'dupe@hotel.com' } as any;
        vi.mocked(businessUserRepo.createBusinessUser).mockRejectedValue(new Error('Unique constraint violation'));

        await expect(createBusinessUserService(inputData)).rejects.toThrow('Unique constraint violation');
    });
});

describe('getBusinessUsersService', () => {
    it('calls getBusinessUsers with no arguments and returns the list', async () => {
        const users = [mockBusinessUser, { ...mockBusinessUser, id: 'user-2', email: 'mgr@hotel.com' }];
        vi.mocked(businessUserRepo.getBusinessUsers).mockResolvedValue(users as any);

        const result = await getBusinessUsersService();

        expect(businessUserRepo.getBusinessUsers).toHaveBeenCalledOnce();
        expect(businessUserRepo.getBusinessUsers).toHaveBeenCalledWith();
        expect(result).toBe(users);
    });

    it('returns an empty array when no business users exist', async () => {
        vi.mocked(businessUserRepo.getBusinessUsers).mockResolvedValue([]);

        const result = await getBusinessUsersService();

        expect(result).toEqual([]);
    });

    it('propagates errors thrown by getBusinessUsers', async () => {
        vi.mocked(businessUserRepo.getBusinessUsers).mockRejectedValue(new Error('DB unavailable'));

        await expect(getBusinessUsersService()).rejects.toThrow('DB unavailable');
    });
});

describe('getBusinessUserByIdService', () => {
    it('calls getBusinessUserById with the provided id and returns the safe user', async () => {
        vi.mocked(businessUserRepo.getBusinessUserById).mockResolvedValue(mockBusinessUser as any);

        const result = await getBusinessUserByIdService('user-1');

        expect(businessUserRepo.getBusinessUserById).toHaveBeenCalledOnce();
        expect(businessUserRepo.getBusinessUserById).toHaveBeenCalledWith('user-1');
        expect(result).toBe(mockBusinessUser);
    });

    it('returns null when user is not found', async () => {
        vi.mocked(businessUserRepo.getBusinessUserById).mockResolvedValue(null);

        const result = await getBusinessUserByIdService('nonexistent');

        expect(result).toBeNull();
    });

    it('propagates errors thrown by getBusinessUserById', async () => {
        vi.mocked(businessUserRepo.getBusinessUserById).mockRejectedValue(new Error('Query error'));

        await expect(getBusinessUserByIdService('user-1')).rejects.toThrow('Query error');
    });
});

describe('updateBusinessUserService', () => {
    it('calls updateBusinessUser with the correct id and data, returns the safe user', async () => {
        const updateData = { username: 'newAdmin' } as any;
        const updatedUser = { ...mockBusinessUser, ...updateData };
        vi.mocked(businessUserRepo.updateBusinessUser).mockResolvedValue(updatedUser as any);

        const result = await updateBusinessUserService('user-1', updateData);

        expect(businessUserRepo.updateBusinessUser).toHaveBeenCalledOnce();
        expect(businessUserRepo.updateBusinessUser).toHaveBeenCalledWith('user-1', updateData);
        expect(result).toBe(updatedUser);
    });

    it('propagates errors thrown by updateBusinessUser', async () => {
        vi.mocked(businessUserRepo.updateBusinessUser).mockRejectedValue(new Error('User not found'));

        await expect(updateBusinessUserService('nonexistent', {} as any)).rejects.toThrow('User not found');
    });

    it('passes partial update data through unchanged', async () => {
        const partialData = { adminStatus: true } as any;
        vi.mocked(businessUserRepo.updateBusinessUser).mockResolvedValue(mockBusinessUser as any);

        await updateBusinessUserService('user-1', partialData);

        expect(businessUserRepo.updateBusinessUser).toHaveBeenCalledWith('user-1', partialData);
    });
});

describe('deleteBusinessUserService', () => {
    it('calls deleteBusinessUser with the provided id and returns the safe user', async () => {
        vi.mocked(businessUserRepo.deleteBusinessUser).mockResolvedValue(mockBusinessUser as any);

        const result = await deleteBusinessUserService('user-1');

        expect(businessUserRepo.deleteBusinessUser).toHaveBeenCalledOnce();
        expect(businessUserRepo.deleteBusinessUser).toHaveBeenCalledWith('user-1');
        expect(result).toBe(mockBusinessUser);
    });

    it('propagates errors thrown by deleteBusinessUser', async () => {
        vi.mocked(businessUserRepo.deleteBusinessUser).mockRejectedValue(new Error('User not found'));

        await expect(deleteBusinessUserService('nonexistent')).rejects.toThrow('User not found');
    });
});