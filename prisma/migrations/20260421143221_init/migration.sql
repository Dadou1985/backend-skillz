-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "clientFullName" TEXT NOT NULL,
    "checkoutDate" TEXT NOT NULL,
    "guestLanguage" TEXT NOT NULL,
    "hotelResponding" BOOLEAN NOT NULL,
    "isChatting" BOOLEAN NOT NULL,
    "room" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "guestTokenId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ChatToChatMessage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ChatToChatMessage_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ChatToChatMessage_B_index" ON "_ChatToChatMessage"("B");

-- CreateIndex (enforce one-chat-per-message)
CREATE UNIQUE INDEX "_ChatToChatMessage_B_key" ON "_ChatToChatMessage"("B");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_guestTokenId_fkey" FOREIGN KEY ("guestTokenId") REFERENCES "guest_tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatToChatMessage" ADD CONSTRAINT "_ChatToChatMessage_A_fkey" FOREIGN KEY ("A") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatToChatMessage" ADD CONSTRAINT "_ChatToChatMessage_B_fkey" FOREIGN KEY ("B") REFERENCES "chat_messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;