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

export const HotelUpdateSchema = HotelSchema.extend({
  body: HotelSchema.shape.body.partial()
})

export type HotelInput = z.infer<typeof HotelSchema>;
export type HotelUpdateInput = Partial<HotelInput> & { id: string };

// ─── CheckList ────────────────────────────────────────────────────────────────

export const CheckListSchema = z.object({
  body: z.object({
    hotelId: z.cuid(),
  })
});

export const CheckListUpdateSchema = CheckListSchema.extend({
  body: CheckListSchema.shape.body.partial()
})

export type CheckListInput = z.infer<typeof CheckListSchema>;
export type CheckListUpdateInput = Partial<CheckListInput> & { id: string };

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

export const CheckListItemUpdateSchema = CheckListItemSchema.extend({
  body: CheckListItemSchema.shape.body.partial()
})

export type CheckListItemInput = z.infer<typeof CheckListItemSchema>;
export type CheckListItemUpdateInput = Partial<CheckListItemInput> & { id: string };

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

export const BusinessUserUpdateSchema = BusinessUserSchema.extend({
  body: BusinessUserSchema.shape.body.partial()
})

export type BusinessUserInput = z.infer<typeof BusinessUserSchema>;
export type BusinessUserUpdateInput = Partial<BusinessUserInput> & { id: string };

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

export const GuestUserUpdateSchema = GuestUserSchema.extend({
  body: GuestUserSchema.shape.body.partial()
})

export type GuestUserInput = z.infer<typeof GuestUserSchema>;
export type GuestUserUpdateInput = Partial<GuestUserInput> & { id: string };

// ─── RoomAmeneties ────────────────────────────────────────────────────────────

export const RoomAmenetiesSchema = z.object({
  body: z.object({
    guestUserId: z.cuid().optional(),
    hotelId:     z.cuid().optional(),
  })
});

export const RoomAmenetiesUpdateSchema = RoomAmenetiesSchema.extend({
  body: RoomAmenetiesSchema.shape.body.partial()
})

export type RoomAmenetiesInput = z.infer<typeof RoomAmenetiesSchema>;
export type RoomAmenetiesUpdateInput = Partial<RoomAmenetiesInput> & { id: string };

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

export const AmenetyUpdateSchema = AmenetySchema.extend({
  body: AmenetySchema.shape.body.partial()
})

export type AmenetyInput = z.infer<typeof AmenetySchema>;
export type AmenetyUpdateInput = Partial<AmenetyInput> & { id: string };

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

export const GuestTokenUpdateSchema = GuestTokenSchema.extend({
  body: GuestTokenSchema.shape.body.partial()
})

export type GuestTokenInput = z.infer<typeof GuestTokenSchema>;
export type GuestTokenUpdateInput = Partial<GuestTokenInput> & { id: string };

// ─── Feedback ─────────────────────────────────────────────────────────────────

export const FeedbackSchema = z.object({
  body: z.object({hotelId: z.cuid()})
});

export const FeedbackUpdateSchema = FeedbackSchema.extend({
  body: FeedbackSchema.shape.body.partial()
})

export type FeedbackInput = z.infer<typeof FeedbackSchema>;
export type FeedbackUpdateInput = Partial<FeedbackInput> & { id: string };

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

export const FeedbackItemUpdateSchema = FeedbackItemSchema.extend({
  body: FeedbackItemSchema.shape.body.partial()
})

export type FeedbackItemInput = z.infer<typeof FeedbackItemSchema>;
export type FeedbackItemUpdateInput = Partial<FeedbackItemInput> & { id: string };

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

export const SupportUpdateSchema = SupportSchema.extend({
  body: SupportSchema.shape.body.partial()
})

export type SupportInput = z.infer<typeof SupportSchema>;
export type SupportUpdateInput = Partial<SupportInput> & { id: string };

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

export const ChatUpdateSchema = ChatSchema.extend({
  body: ChatSchema.shape.body.partial()
})

export type ChatInput = z.infer<typeof ChatSchema>;
export type ChatUpdateInput = Partial<ChatInput> & { id: string };

// ─── Login ────────────────────────────────────────────────────────────────────

export const LoginSchema = z.object({
  body: z.object({
    id: z.string(),
  })
});

export const LoginUpdateSchema = LoginSchema.extend({
  body: LoginSchema.shape.body.partial()
})

export type LoginInput = z.infer<typeof LoginSchema>;
export type LoginUpdateInput = Partial<LoginInput> & { id: string };

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

export const ChatMessageUpdateSchema = ChatMessageSchema.extend({
  body: ChatMessageSchema.shape.body.partial()
})

export type ChatMessageInput = z.infer<typeof ChatMessageSchema>;
export type ChatMessageUpdateInput = Partial<ChatMessageInput> & { id: string };
