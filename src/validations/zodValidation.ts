import { z } from 'zod';

// ─── Hotel ───────────────────────────────────────────────────────────────────

export const HotelSchema = z.object({
  body: z.object({
    hotelName:    z.string(),
    adresse:      z.string(),
    city:         z.string(),
    classement:   z.string(),
    code_postal:  z.string(),
    country:      z.string(),
    departement:  z.string(),
    region:       z.string(),
    lat:          z.number(),
    lng:          z.number(),
    mail:         z.email(),
    partnership:  z.boolean(),
    phone:        z.string(),
    room:         z.number().int().positive(),
    website:      z.url(),
    appLink:      z.url().optional(),
    base64Url:    z.string().optional(),
    logo:         z.string().optional(),
    pricingModel: z.string().optional(),
  })
});

export type HotelInput = z.infer<typeof HotelSchema>;

// ─── CheckList ────────────────────────────────────────────────────────────────

export const CheckListSchema = z.object({
  body: z.object({
    hotelId: z.cuid(),
  })
});

export type CheckListInput = z.infer<typeof CheckListSchema>;

// ─── CheckListItem ────────────────────────────────────────────────────────────

export const CheckListItemSchema = z.object({
    body: z.object({
        task:        z.string(),
        status:      z.boolean(),
        checkListId: z.cuid(),
        morningId:   z.cuid().optional(),
        eveningId:   z.cuid().optional(),
        nightId:     z.cuid().optional(),
    })
});

export type CheckListItemInput = z.infer<typeof CheckListItemSchema>;

// ─── BusinessUser ─────────────────────────────────────────────────────────────

export const BusinessUserSchema = z.object({
  body: z.object({
    adminStatus: z.boolean(),
    email:       z.email(),
    hotelId:     z.cuid(),
    password:    z.string().min(8),
    username:    z.string().min(2),
  })
});

export type BusinessUserInput = z.infer<typeof BusinessUserSchema>;

// ─── GuestUser ────────────────────────────────────────────────────────────────

export const GuestUserSchema = z.object({
  body: z.object({
    username:           z.string().min(2),
    email:              z.email(),
    password:           z.string().min(8),
    phone:              z.string(),
    gender:             z.string(),
    photo:              z.string().optional(),
    language:           z.string(),
    localLanguage:      z.string(),
    room:               z.string(),
    hotelId:            z.cuid(),
    journeyId:          z.string(),
    guestCategory:      z.string(),
    guestCategoryClone: z.string().optional(),
    checkoutDate:       z.string(),
    notificationStatus: z.string(),
    lastTimeConnected:  z.coerce.bigint(),
    newConnection:      z.boolean(),
    isChatting:         z.boolean().optional(),
    hotelVisitedArray:  z.array(z.string()).default([]),
  })
});

export type GuestUserInput = z.infer<typeof GuestUserSchema>;

// ─── RoomAmeneties ────────────────────────────────────────────────────────────

export const RoomAmeNetiesSchema = z.object({
  body: z.object({
    guestUserId: z.cuid().optional(),
    hotelId:     z.cuid().optional(),
  })
});

export type RoomAmeNetiesInput = z.infer<typeof RoomAmeNetiesSchema>;

// ─── Amenety ──────────────────────────────────────────────────────────────────

export const AmenetySchema = z.object({
  body: z.object({
    checkoutDate:  z.string(),
    clientName:    z.string(),
    room:          z.string(),
    babyBedId:     z.cuid().optional(),
    blanketId:     z.cuid().optional(),
    hairDryerId:   z.cuid().optional(),
    ironId:        z.cuid().optional(),
    pillowId:      z.cuid().optional(),
    soapId:        z.cuid().optional(),
    toiletPaperId: z.cuid().optional(),
    towelId:       z.cuid().optional(),
  })
});

export type AmenetyInput = z.infer<typeof AmenetySchema>;

// ─── GuestToken ───────────────────────────────────────────────────────────────

export const GuestTokenSchema = z.object({
  body: z.object({
    guestUserId:    z.cuid(),
    endpoint:       z.url(),
    expirationTime: z.string().optional(),
    auth:           z.string(),
    p256dh:         z.string(),
  })
});

export type GuestTokenInput = z.infer<typeof GuestTokenSchema>;

// ─── Feedback ─────────────────────────────────────────────────────────────────

export const FeedbackSchema = z.object({
  body: z.object({hotelId: z.cuid()})
});

export type FeedbackInput = z.infer<typeof FeedbackSchema>;

// ─── FeedbackItem ─────────────────────────────────────────────────────────────

export const FeedbackItemSchema = z.object({
  body: z.object({
    author:                 z.string(),
    text:                   z.string(),
    hotelDept:              z.string(),
    hotelName:              z.string(),
    hotelRegion:            z.string(),
    satisfactionFeedbackId: z.cuid().optional(),
    improvementFeedbackId:  z.cuid().optional(),
  })
});

export type FeedbackItemInput = z.infer<typeof FeedbackItemSchema>;

// ─── Support ──────────────────────────────────────────────────────────────────

export const SupportSchema = z.object({
  body: z.object({
    hotelId:      z.cuid(),
    hotelName:    z.string(),
    pricingModel: z.string(),
    checkoutDate: z.string(),
    adminSpeak:   z.boolean(),
    status:       z.boolean(),
  })
});

export type SupportInput = z.infer<typeof SupportSchema>;

// ─── Chat ─────────────────────────────────────────────────────────────────────

export const ChatSchema = z.object({
  body: z.object({
    clientFullName:  z.string(),
    checkoutDate:    z.string(),
    guestLanguage:   z.string(),
    hotelResponding: z.boolean(),
    isChatting:      z.boolean(),
    room:            z.string(),
    status:          z.boolean(),
    userId:          z.string(),
    hotelId:         z.cuid().optional(),
    supportId:       z.cuid().optional(),
    guestTokenId:    z.cuid().optional(),
  })
});

export type ChatInput = z.infer<typeof ChatSchema>;

// ─── ChatMessage ──────────────────────────────────────────────────────────────

export const ChatMessageSchema = z.object({
  body: z.object({
    author: z.string(),
    email:  z.email(),
    title:  z.string(),
    text:   z.string(),
    photo:  z.string().optional(),
    date:   z.coerce.date(),
    room:   z.string(),
    userId: z.string(),
    chatId: z.cuid(),
  })
});

export type ChatMessageInput = z.infer<typeof ChatMessageSchema>;
