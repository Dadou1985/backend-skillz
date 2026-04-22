import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockPrisma = {
    feedbackItem: {
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
    createFeedbackItem,
    getFeedbackItems,
    getFeedbackItemById,
    updateFeedbackItem,
    deleteFeedbackItem,
} from '../../../models/feedback/feedbackItem.repository';

const mockFeedbackItem = {
    id: 'item-1',
    author: 'John Doe',
    text: 'Great service',
    hotelDept: 'Reception',
    hotelName: 'Grand Hotel',
    hotelRegion: 'North',
    satisfactionFeedbackId: 'feedback-1',
    improvementFeedbackId: null,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
};

beforeEach(() => {
    vi.clearAllMocks();
});

describe('createFeedbackItem', () => {
    it('calls prisma.feedbackItem.create with the provided data and returns the result', async () => {
        const inputData = {
            author: 'John Doe',
            text: 'Great service',
            hotelDept: 'Reception',
            hotelName: 'Grand Hotel',
            hotelRegion: 'North',
            createdAt: new Date(),
            updatedAt: new Date(),
        } as any;
        mockPrisma.feedbackItem.create.mockResolvedValue(mockFeedbackItem);

        const result = await createFeedbackItem(inputData);

        expect(mockPrisma.feedbackItem.create).toHaveBeenCalledOnce();
        expect(mockPrisma.feedbackItem.create).toHaveBeenCalledWith({ data: inputData });
        expect(result).toBe(mockFeedbackItem);
    });

    it('propagates errors from prisma.feedbackItem.create', async () => {
        const inputData = { author: 'Test' } as any;
        mockPrisma.feedbackItem.create.mockRejectedValue(new Error('Constraint error'));

        await expect(createFeedbackItem(inputData)).rejects.toThrow('Constraint error');
    });
});

describe('getFeedbackItems', () => {
    it('calls prisma.feedbackItem.findMany with no arguments and returns the list', async () => {
        const items = [mockFeedbackItem, { ...mockFeedbackItem, id: 'item-2' }];
        mockPrisma.feedbackItem.findMany.mockResolvedValue(items);

        const result = await getFeedbackItems();

        expect(mockPrisma.feedbackItem.findMany).toHaveBeenCalledOnce();
        expect(mockPrisma.feedbackItem.findMany).toHaveBeenCalledWith();
        expect(result).toBe(items);
    });

    it('returns empty array when no feedback items exist', async () => {
        mockPrisma.feedbackItem.findMany.mockResolvedValue([]);

        const result = await getFeedbackItems();

        expect(result).toEqual([]);
    });
});

describe('getFeedbackItemById', () => {
    it('calls prisma.feedbackItem.findUnique with the correct where clause and returns the result', async () => {
        mockPrisma.feedbackItem.findUnique.mockResolvedValue(mockFeedbackItem);

        const result = await getFeedbackItemById('item-1');

        expect(mockPrisma.feedbackItem.findUnique).toHaveBeenCalledOnce();
        expect(mockPrisma.feedbackItem.findUnique).toHaveBeenCalledWith({ where: { id: 'item-1' } });
        expect(result).toBe(mockFeedbackItem);
    });

    it('returns null when no feedback item is found', async () => {
        mockPrisma.feedbackItem.findUnique.mockResolvedValue(null);

        const result = await getFeedbackItemById('nonexistent');

        expect(result).toBeNull();
    });
});

describe('updateFeedbackItem', () => {
    it('calls prisma.feedbackItem.update with correct where and data, returns the result', async () => {
        const updateData = { text: 'Updated feedback text' } as any;
        const updatedItem = { ...mockFeedbackItem, ...updateData };
        mockPrisma.feedbackItem.update.mockResolvedValue(updatedItem);

        const result = await updateFeedbackItem('item-1', updateData);

        expect(mockPrisma.feedbackItem.update).toHaveBeenCalledOnce();
        expect(mockPrisma.feedbackItem.update).toHaveBeenCalledWith({ where: { id: 'item-1' }, data: updateData });
        expect(result).toBe(updatedItem);
    });

    it('propagates errors from prisma.feedbackItem.update', async () => {
        mockPrisma.feedbackItem.update.mockRejectedValue(new Error('FeedbackItem not found'));

        await expect(updateFeedbackItem('nonexistent', {} as any)).rejects.toThrow('FeedbackItem not found');
    });

    it('accepts nullable satisfactionFeedbackId in partial updates', async () => {
        const partialData = { satisfactionFeedbackId: null } as any;
        mockPrisma.feedbackItem.update.mockResolvedValue(mockFeedbackItem);

        await updateFeedbackItem('item-1', partialData);

        expect(mockPrisma.feedbackItem.update).toHaveBeenCalledWith({ where: { id: 'item-1' }, data: partialData });
    });
});

describe('deleteFeedbackItem', () => {
    it('calls prisma.feedbackItem.delete with the correct where clause and returns the result', async () => {
        mockPrisma.feedbackItem.delete.mockResolvedValue(mockFeedbackItem);

        const result = await deleteFeedbackItem('item-1');

        expect(mockPrisma.feedbackItem.delete).toHaveBeenCalledOnce();
        expect(mockPrisma.feedbackItem.delete).toHaveBeenCalledWith({ where: { id: 'item-1' } });
        expect(result).toBe(mockFeedbackItem);
    });

    it('propagates errors from prisma.feedbackItem.delete', async () => {
        mockPrisma.feedbackItem.delete.mockRejectedValue(new Error('FeedbackItem not found'));

        await expect(deleteFeedbackItem('nonexistent')).rejects.toThrow('FeedbackItem not found');
    });
});