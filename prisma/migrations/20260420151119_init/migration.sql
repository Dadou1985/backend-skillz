-- CreateTable
CREATE TABLE "hotels" (
    "id" TEXT NOT NULL,
    "hotelName" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "classement" TEXT NOT NULL,
    "code_postal" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "departement" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "mail" TEXT NOT NULL,
    "markup" DOUBLE PRECISION NOT NULL,
    "partnership" BOOLEAN NOT NULL,
    "phone" TEXT NOT NULL,
    "room" INTEGER NOT NULL,
    "website" TEXT NOT NULL,
    "appLink" TEXT,
    "base64Url" TEXT,
    "logo" TEXT,
    "pricingModel" TEXT,

    CONSTRAINT "hotels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_users" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "adminStatus" BOOLEAN NOT NULL,
    "appLink" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "classement" TEXT NOT NULL,
    "code_postal" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" BIGINT NOT NULL,
    "email" TEXT NOT NULL,
    "hotelDept" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "hotelName" TEXT NOT NULL,
    "hotelRegion" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "pricingModel" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "adresse" TEXT,
    "base64Url" TEXT,
    "logo" TEXT,
    "mail" TEXT,
    "phone" TEXT,
    "website" TEXT,

    CONSTRAINT "business_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guest_users" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "photo" TEXT,
    "language" TEXT NOT NULL,
    "localLanguage" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "hotelName" TEXT NOT NULL,
    "hotelDept" TEXT NOT NULL,
    "hotelRegion" TEXT NOT NULL,
    "hotelPhone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "classement" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "journeyId" TEXT NOT NULL,
    "guestCategory" TEXT NOT NULL,
    "guestCategoryClone" TEXT,
    "checkoutDate" TEXT NOT NULL,
    "notificationStatus" TEXT NOT NULL,
    "lastTimeConnected" BIGINT NOT NULL,
    "newConnection" BOOLEAN NOT NULL,
    "isChatting" BOOLEAN,
    "updatedAt" TIMESTAMP(3),
    "babyBed" BOOLEAN NOT NULL,
    "blanket" BOOLEAN NOT NULL,
    "hairDryer" BOOLEAN NOT NULL,
    "iron" BOOLEAN NOT NULL,
    "pillow" BOOLEAN NOT NULL,
    "soap" BOOLEAN NOT NULL,
    "toiletPaper" BOOLEAN NOT NULL,
    "towel" BOOLEAN NOT NULL,
    "hotelVisitedArray" TEXT[],

    CONSTRAINT "guest_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guest_tokens" (
    "id" TEXT NOT NULL,
    "guestUserId" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "expirationTime" TEXT,
    "auth" TEXT NOT NULL,
    "p256dh" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "guest_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedbacks" (
    "id" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback_items" (
    "id" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "hotelDept" TEXT NOT NULL,
    "hotelName" TEXT NOT NULL,
    "hotelRegion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "satisfactionFeedbackId" TEXT,
    "improvementFeedbackId" TEXT,

    CONSTRAINT "feedback_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "support" (
    "id" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "hotelName" TEXT NOT NULL,
    "pricingModel" TEXT NOT NULL,
    "checkoutDate" TEXT NOT NULL,
    "adminSpeak" BOOLEAN NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "support_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_messages" (
    "id" TEXT NOT NULL,
    "supportId" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "photo" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chat_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_users_userId_key" ON "business_users"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "guest_users_userId_key" ON "guest_users"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "guest_tokens_guestUserId_key" ON "guest_tokens"("guestUserId");

-- AddForeignKey
ALTER TABLE "business_users" ADD CONSTRAINT "business_users_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guest_users" ADD CONSTRAINT "guest_users_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guest_tokens" ADD CONSTRAINT "guest_tokens_guestUserId_fkey" FOREIGN KEY ("guestUserId") REFERENCES "guest_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_items" ADD CONSTRAINT "feedback_items_satisfactionFeedbackId_fkey" FOREIGN KEY ("satisfactionFeedbackId") REFERENCES "feedbacks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_items" ADD CONSTRAINT "feedback_items_improvementFeedbackId_fkey" FOREIGN KEY ("improvementFeedbackId") REFERENCES "feedbacks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "support" ADD CONSTRAINT "support_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_supportId_fkey" FOREIGN KEY ("supportId") REFERENCES "support"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
