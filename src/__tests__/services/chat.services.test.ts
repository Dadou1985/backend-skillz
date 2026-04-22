import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../models/chat/chat.repository', () => ({
    createChat: vi.fn(),
    getChatById: vi.fn(),
    updateChat: vi.fn(),
    deleteChat: vi.fn(),
}));

import * as chatRepo from '../../models/chat/chat.repository';
import {
    createChatService,
    getChatByIdService,
    updateChatService,
    deleteChatService,
} from '../../services/chat/chat.services';

const mockChat = {
    id: 'chat-1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
};

beforeEach(() => {
    vi.clearAllMocks();
});

describe('createChatService', () => {
    it('calls createChat with the provided data and returns the result', async () => {
        const inputData = { hotelId: 'hotel-1', createdAt: new Date(), updatedAt: new Date() } as any;
        vi.mocked(chatRepo.createChat).mockResolvedValue(mockChat as any);

        const result = await createChatService(inputData);

        expect(chatRepo.createChat).toHaveBeenCalledOnce();
        expect(chatRepo.createChat).toHaveBeenCalledWith(inputData);
        expect(result).toBe(mockChat);
    });

    it('propagates errors thrown by createChat', async () => {
        const inputData = { hotelId: 'hotel-1', createdAt: new Date(), updatedAt: new Date() } as any;
        const dbError = new Error('DB insert failed');
        vi.mocked(chatRepo.createChat).mockRejectedValue(dbError);

        await expect(createChatService(inputData)).rejects.toThrow('DB insert failed');
    });
});

describe('getChatByIdService', () => {
    it('calls getChatById with the provided id and returns the result', async () => {
        vi.mocked(chatRepo.getChatById).mockResolvedValue(mockChat as any);

        const result = await getChatByIdService('chat-1');

        expect(chatRepo.getChatById).toHaveBeenCalledOnce();
        expect(chatRepo.getChatById).toHaveBeenCalledWith('chat-1');
        expect(result).toBe(mockChat);
    });

    it('returns null when getChatById returns null (not found)', async () => {
        vi.mocked(chatRepo.getChatById).mockResolvedValue(null);

        const result = await getChatByIdService('nonexistent-id');

        expect(result).toBeNull();
    });

    it('propagates errors thrown by getChatById', async () => {
        vi.mocked(chatRepo.getChatById).mockRejectedValue(new Error('DB error'));

        await expect(getChatByIdService('chat-1')).rejects.toThrow('DB error');
    });
});

describe('updateChatService', () => {
    it('calls updateChat with the correct id and data, returns the result', async () => {
        const updateData = { updatedAt: new Date() } as any;
        const updatedChat = { ...mockChat, ...updateData };
        vi.mocked(chatRepo.updateChat).mockResolvedValue(updatedChat as any);

        const result = await updateChatService('chat-1', updateData);

        expect(chatRepo.updateChat).toHaveBeenCalledOnce();
        expect(chatRepo.updateChat).toHaveBeenCalledWith('chat-1', updateData);
        expect(result).toBe(updatedChat);
    });

    it('propagates errors thrown by updateChat', async () => {
        vi.mocked(chatRepo.updateChat).mockRejectedValue(new Error('Record not found'));

        await expect(updateChatService('nonexistent', {} as any)).rejects.toThrow('Record not found');
    });

    it('passes partial update data through unchanged', async () => {
        const partialData = { updatedAt: new Date('2025-06-01') } as any;
        vi.mocked(chatRepo.updateChat).mockResolvedValue(mockChat as any);

        await updateChatService('chat-1', partialData);

        expect(chatRepo.updateChat).toHaveBeenCalledWith('chat-1', partialData);
    });
});

describe('deleteChatService', () => {
    it('calls deleteChat with the provided id and returns the result', async () => {
        vi.mocked(chatRepo.deleteChat).mockResolvedValue(mockChat as any);

        const result = await deleteChatService('chat-1');

        expect(chatRepo.deleteChat).toHaveBeenCalledOnce();
        expect(chatRepo.deleteChat).toHaveBeenCalledWith('chat-1');
        expect(result).toBe(mockChat);
    });

    it('propagates errors thrown by deleteChat', async () => {
        vi.mocked(chatRepo.deleteChat).mockRejectedValue(new Error('Chat not found'));

        await expect(deleteChatService('nonexistent')).rejects.toThrow('Chat not found');
    });
});