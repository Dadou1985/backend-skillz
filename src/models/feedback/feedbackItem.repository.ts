import { prisma } from "../../config/prisma";
import type { FeedbackItemCreateInput } from "../../prisma/models/FeedbackItem";

export async function createFeedbackItem(data: FeedbackItemCreateInput) {
    return await prisma.feedbackItem.create({ data });
}

export async function getFeedbackItems() {
    return await prisma.feedbackItem.findMany();
}

export async function getFeedbackItemById(id: string) {
    return await prisma.feedbackItem.findUnique({ where: { id } });
}

export async function updateFeedbackItem(id: string, data: Partial<FeedbackItemCreateInput>) {
    return await prisma.feedbackItem.update({ where: { id }, data });
}

export async function deleteFeedbackItem(id: string) {
    return await prisma.feedbackItem.delete({ where: { id } });
}