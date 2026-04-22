import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockPrisma = {
    chatMessage: {
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
    createChatMessage,
    getChatMessages,
    getChatMessageById,
    updateChatMessage,
    deleteChatMessage,
} from '../../../models/chat/chatMessgae.repository';

const mockChatMessage = {
    id: 'msg-1',
    author: 'John Doe',
    email: 'john@example.com',
    title: 'Hello',
    text: 'Hi there',
    photo: null,
    date: '2024-01-01',
    room: '101',
    userId: 'user-1',
    chatId: 'chat-1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
};

beforeEach(() => {
    vi.clearAllMocks();
});

describe('createChatMessage', () => {
    it('calls prisma.chatMessage.create with the provided data and returns the result', async () => {
        const inputData = {
            author: 'John Doe',
            email: 'john@example.com',
            text: 'Hello',
            chat: { connect: { id: 'chat-1' } },
            createdAt: new Date(),
            updatedAt: new Date(),
        } as any;
        mockPrisma.chatMessage.create.mockResolvedValue(mockChatMessage);

        const result = await createChatMessage(inputData);

        expect(mockPrisma.chatMessage.create).toHaveBeenCalledOnce();
        expect(mockPrisma.chatMessage.create).toHaveBeenCalledWith({ data: inputData });
        expect(result).toBe(mockChatMessage);
    });

    it('propagates errors from prisma.chatMessage.create', async () => {
        const inputData = { author: 'Test' } as any;
        mockPrisma.chatMessage.create.mockRejectedValue(new Error('FK constraint violated'));

        await expect(createChatMessage(inputData)).rejects.toThrow('FK constraint violated');
    });
});

describe('getChatMessages', () => {
    it('calls prisma.chatMessage.findMany with no arguments and returns the list', async () => {
        const messages = [mockChatMessage, { ...mockChatMessage, id: 'msg-2' }];
        mockPrisma.chatMessage.findMany.mockResolvedValue(messages);

        const result = await getChatMessages();

        expect(mockPrisma.chatMessage.findMany).toHaveBeenCalledOnce();
        expect(mockPrisma.chatMessage.findMany).toHaveBeenCalledWith();
        expect(result).toBe(messages);
    });

    it('returns empty array when no messages exist', async () => {
        mockPrisma.chatMessage.findMany.mockResolvedValue([]);

        const result = await getChatMessages();

        expect(result).toEqual([]);
    });
});

describe('getChatMessageById', () => {
    it('calls prisma.chatMessage.findUnique with the correct where clause and returns the result', async () => {
        mockPrisma.chatMessage.findUnique.mockResolvedValue(mockChatMessage);

        const result = await getChatMessageById('msg-1');

        expect(mockPrisma.chatMessage.findUnique).toHaveBeenCalledOnce();
        expect(mockPrisma.chatMessage.findUnique).toHaveBeenCalledWith({ where: { id: 'msg-1' } });
        expect(result).toBe(mockChatMessage);
    });

    it('returns null when no message is found', async () => {
        mockPrisma.chatMessage.findUnique.mockResolvedValue(null);

        const result = await getChatMessageById('nonexistent');

        expect(result).toBeNull();
    });
});

describe('updateChatMessage', () => {
    it('calls prisma.chatMessage.update with correct where and data, returns the result', async () => {
        const updateData = { text: 'Updated text' } as any;
        const updatedMsg = { ...mockChatMessage, ...updateData };
        mockPrisma.chatMessage.update.mockResolvedValue(updatedMsg);

        const result = await updateChatMessage('msg-1', updateData);

        expect(mockPrisma.chatMessage.update).toHaveBeenCalledOnce();
        expect(mockPrisma.chatMessage.update).toHaveBeenCalledWith({ where: { id: 'msg-1' }, data: updateData });
        expect(result).toBe(updatedMsg);
    });

    it('propagates errors from prisma.chatMessage.update', async () => {
        mockPrisma.chatMessage.update.mockRejectedValue(new Error('Message not found'));

        await expect(updateChatMessage('nonexistent', {} as any)).rejects.toThrow('Message not found');
    });
});

describe('deleteChatMessage', () => {
    it('calls prisma.chatMessage.delete with the correct where clause and returns the result', async () => {
        mockPrisma.chatMessage.delete.mockResolvedValue(mockChatMessage);

        const result = await deleteChatMessage('msg-1');

        expect(mockPrisma.chatMessage.delete).toHaveBeenCalledOnce();
        expect(mockPrisma.chatMessage.delete).toHaveBeenCalledWith({ where: { id: 'msg-1' } });
        expect(result).toBe(mockChatMessage);
    });

    it('propagates errors from prisma.chatMessage.delete', async () => {
        mockPrisma.chatMessage.delete.mockRejectedValue(new Error('Message not found'));

        await expect(deleteChatMessage('nonexistent')).rejects.toThrow('Message not found');
    });
});