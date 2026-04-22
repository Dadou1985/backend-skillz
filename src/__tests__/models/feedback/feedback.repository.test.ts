import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockPrisma = {
    feedback: {
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
    createFeedback,
    getFeedbacks,
    getFeedbackById,
    updateFeedback,
    deleteFeedback,
} from '../../../models/feedback/feedback.repository';

const mockFeedback = {
    id: 'feedback-1',
    hotelId: 'hotel-1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
};

beforeEach(() => {
    vi.clearAllMocks();
});

describe('createFeedback', () => {
    it('calls prisma.feedback.create with the provided data and returns the result', async () => {
        const inputData = {
            hotel: { connect: { id: 'hotel-1' } },
            createdAt: new Date(),
            updatedAt: new Date(),
        } as any;
        mockPrisma.feedback.create.mockResolvedValue(mockFeedback);

        const result = await createFeedback(inputData);

        expect(mockPrisma.feedback.create).toHaveBeenCalledOnce();
        expect(mockPrisma.feedback.create).toHaveBeenCalledWith({ data: inputData });
        expect(result).toBe(mockFeedback);
    });

    it('propagates errors from prisma.feedback.create', async () => {
        const inputData = { hotel: { connect: { id: 'hotel-1' } } } as any;
        mockPrisma.feedback.create.mockRejectedValue(new Error('Hotel not found'));

        await expect(createFeedback(inputData)).rejects.toThrow('Hotel not found');
    });
});

describe('getFeedbacks', () => {
    it('calls prisma.feedback.findMany with no arguments and returns the list', async () => {
        const feedbacks = [mockFeedback, { ...mockFeedback, id: 'feedback-2' }];
        mockPrisma.feedback.findMany.mockResolvedValue(feedbacks);

        const result = await getFeedbacks();

        expect(mockPrisma.feedback.findMany).toHaveBeenCalledOnce();
        expect(mockPrisma.feedback.findMany).toHaveBeenCalledWith();
        expect(result).toBe(feedbacks);
    });

    it('returns empty array when no feedbacks exist', async () => {
        mockPrisma.feedback.findMany.mockResolvedValue([]);

        const result = await getFeedbacks();

        expect(result).toEqual([]);
    });
});

describe('getFeedbackById', () => {
    it('calls prisma.feedback.findUnique with the correct where clause and returns the result', async () => {
        mockPrisma.feedback.findUnique.mockResolvedValue(mockFeedback);

        const result = await getFeedbackById('feedback-1');

        expect(mockPrisma.feedback.findUnique).toHaveBeenCalledOnce();
        expect(mockPrisma.feedback.findUnique).toHaveBeenCalledWith({ where: { id: 'feedback-1' } });
        expect(result).toBe(mockFeedback);
    });

    it('returns null when no feedback is found', async () => {
        mockPrisma.feedback.findUnique.mockResolvedValue(null);

        const result = await getFeedbackById('nonexistent');

        expect(result).toBeNull();
    });
});

describe('updateFeedback', () => {
    it('calls prisma.feedback.update with correct where and data, returns the result', async () => {
        const updateData = { updatedAt: new Date('2025-01-01') } as any;
        const updatedFeedback = { ...mockFeedback, ...updateData };
        mockPrisma.feedback.update.mockResolvedValue(updatedFeedback);

        const result = await updateFeedback('feedback-1', updateData);

        expect(mockPrisma.feedback.update).toHaveBeenCalledOnce();
        expect(mockPrisma.feedback.update).toHaveBeenCalledWith({ where: { id: 'feedback-1' }, data: updateData });
        expect(result).toBe(updatedFeedback);
    });

    it('propagates errors from prisma.feedback.update', async () => {
        mockPrisma.feedback.update.mockRejectedValue(new Error('Feedback not found'));

        await expect(updateFeedback('nonexistent', {} as any)).rejects.toThrow('Feedback not found');
    });
});

describe('deleteFeedback', () => {
    it('calls prisma.feedback.delete with the correct where clause and returns the result', async () => {
        mockPrisma.feedback.delete.mockResolvedValue(mockFeedback);

        const result = await deleteFeedback('feedback-1');

        expect(mockPrisma.feedback.delete).toHaveBeenCalledOnce();
        expect(mockPrisma.feedback.delete).toHaveBeenCalledWith({ where: { id: 'feedback-1' } });
        expect(result).toBe(mockFeedback);
    });

    it('propagates errors from prisma.feedback.delete', async () => {
        mockPrisma.feedback.delete.mockRejectedValue(new Error('Feedback not found'));

        await expect(deleteFeedback('nonexistent')).rejects.toThrow('Feedback not found');
    });
});