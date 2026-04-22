import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockPrisma = {
    chat: {
        create: vi.fn(),
        findMany: vi.fn(),
        findUnique: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
    },
    chatMessage: {
        deleteMany: vi.fn(),
    },
    $transaction: vi.fn(),
};

vi.mock('../../../config/prisma', () => ({
    prisma: mockPrisma,
}));

import {
    createChat,
    getChats,
    getChatById,
    updateChat,
    deleteChat,
} from '../../../models/chat/chat.repository';

const mockChat = {
    id: 'chat-1',
    clientFullName: 'Jane Smith',
    checkoutDate: '2024-06-01',
    guestLanguage: 'en',
    hotelResponding: false,
    isChatting: true,
    room: '101',
    status: true,
    userId: 'user-1',
    hotelId: 'hotel-1',
    supportId: null,
    guestTokenId: null,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
};

beforeEach(() => {
    vi.clearAllMocks();
});

describe('createChat', () => {
    it('calls prisma.chat.create with the provided data and returns the result', async () => {
        const inputData = {
            clientFullName: 'Jane Smith',
            hotel: { connect: { id: 'hotel-1' } },
            createdAt: new Date(),
            updatedAt: new Date(),
        } as any;
        mockPrisma.chat.create.mockResolvedValue(mockChat);

        const result = await createChat(inputData);

        expect(mockPrisma.chat.create).toHaveBeenCalledOnce();
        expect(mockPrisma.chat.create).toHaveBeenCalledWith({ data: inputData });
        expect(result).toBe(mockChat);
    });

    it('propagates errors from prisma.chat.create', async () => {
        const inputData = { clientFullName: 'Test' } as any;
        mockPrisma.chat.create.mockRejectedValue(new Error('DB error'));

        await expect(createChat(inputData)).rejects.toThrow('DB error');
    });
});

describe('getChats', () => {
    it('calls prisma.chat.findMany with no arguments and returns the list', async () => {
        const chats = [mockChat, { ...mockChat, id: 'chat-2' }];
        mockPrisma.chat.findMany.mockResolvedValue(chats);

        const result = await getChats();

        expect(mockPrisma.chat.findMany).toHaveBeenCalledOnce();
        expect(mockPrisma.chat.findMany).toHaveBeenCalledWith();
        expect(result).toBe(chats);
    });

    it('returns empty array when no chats exist', async () => {
        mockPrisma.chat.findMany.mockResolvedValue([]);

        const result = await getChats();

        expect(result).toEqual([]);
    });
});

describe('getChatById', () => {
    it('calls prisma.chat.findUnique with the correct where clause and returns the result', async () => {
        mockPrisma.chat.findUnique.mockResolvedValue(mockChat);

        const result = await getChatById('chat-1');

        expect(mockPrisma.chat.findUnique).toHaveBeenCalledOnce();
        expect(mockPrisma.chat.findUnique).toHaveBeenCalledWith({ where: { id: 'chat-1' } });
        expect(result).toBe(mockChat);
    });

    it('returns null when no chat is found', async () => {
        mockPrisma.chat.findUnique.mockResolvedValue(null);

        const result = await getChatById('nonexistent');

        expect(result).toBeNull();
    });
});

describe('updateChat', () => {
    it('calls prisma.chat.update with correct where and data, returns the result', async () => {
        const updateData = { isChatting: false } as any;
        const updatedChat = { ...mockChat, ...updateData };
        mockPrisma.chat.update.mockResolvedValue(updatedChat);

        const result = await updateChat('chat-1', updateData);

        expect(mockPrisma.chat.update).toHaveBeenCalledOnce();
        expect(mockPrisma.chat.update).toHaveBeenCalledWith({ where: { id: 'chat-1' }, data: updateData });
        expect(result).toBe(updatedChat);
    });

    it('propagates errors from prisma.chat.update', async () => {
        mockPrisma.chat.update.mockRejectedValue(new Error('Record not found'));

        await expect(updateChat('nonexistent', {} as any)).rejects.toThrow('Record not found');
    });
});

describe('deleteChat', () => {
    it('executes a transaction that deletes messages then the chat', async () => {
        const deletedChat = mockChat;
        // Simulate $transaction executing the callback
        mockPrisma.$transaction.mockImplementation(async (callback: (tx: typeof mockPrisma) => Promise<unknown>) => {
            const txMock = {
                chatMessage: { deleteMany: vi.fn().mockResolvedValue({ count: 2 }) },
                chat: { delete: vi.fn().mockResolvedValue(deletedChat) },
            };
            return callback(txMock as any);
        });

        const result = await deleteChat('chat-1');

        expect(mockPrisma.$transaction).toHaveBeenCalledOnce();
        expect(result).toBe(deletedChat);
    });

    it('deletes chatMessages before deleting the chat inside the transaction', async () => {
        const callOrder: string[] = [];
        mockPrisma.$transaction.mockImplementation(async (callback: (tx: any) => Promise<unknown>) => {
            const txMock = {
                chatMessage: {
                    deleteMany: vi.fn().mockImplementation(async () => {
                        callOrder.push('deleteMessages');
                        return { count: 1 };
                    }),
                },
                chat: {
                    delete: vi.fn().mockImplementation(async () => {
                        callOrder.push('deleteChat');
                        return mockChat;
                    }),
                },
            };
            return callback(txMock);
        });

        await deleteChat('chat-1');

        expect(callOrder).toEqual(['deleteMessages', 'deleteChat']);
    });

    it('deletes chatMessages for the correct chatId inside the transaction', async () => {
        let capturedDeleteManyArgs: unknown;
        mockPrisma.$transaction.mockImplementation(async (callback: (tx: any) => Promise<unknown>) => {
            const txMock = {
                chatMessage: {
                    deleteMany: vi.fn().mockImplementation(async (args: unknown) => {
                        capturedDeleteManyArgs = args;
                        return { count: 0 };
                    }),
                },
                chat: { delete: vi.fn().mockResolvedValue(mockChat) },
            };
            return callback(txMock);
        });

        await deleteChat('chat-1');

        expect(capturedDeleteManyArgs).toEqual({ where: { chatId: 'chat-1' } });
    });

    it('propagates transaction errors', async () => {
        mockPrisma.$transaction.mockRejectedValue(new Error('Transaction failed'));

        await expect(deleteChat('chat-1')).rejects.toThrow('Transaction failed');
    });
});