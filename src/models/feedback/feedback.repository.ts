import { prisma } from "../../config/prisma";
import type { FeedbackCreateInput } from "../../prisma/models/Feedback";

export async function createFeedback(data: FeedbackCreateInput) {
    return await prisma.feedback.create({ data });
}

export async function getFeedbacks(id: string) {
    return await prisma.feedback.findMany({ where: { hotelId: id } });
}

export async function getFeedbackById(id: string) {
    return await prisma.feedback.findUnique({ where: { id } });
}

export async function updateFeedback(id: string, data: Partial<FeedbackCreateInput>) {
    return await prisma.feedback.update({ where: { id }, data });
}

export async function deleteFeedback(id: string) {
    return await prisma.feedback.delete({ where: { id } });
}