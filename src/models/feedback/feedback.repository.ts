import { prisma } from "../../config/prisma.ts";
import type { FeedbackCreateInput } from "../../../prisma/prisma/models/Feedback.ts";

export async function createFeedback(data: FeedbackCreateInput) {
    return await prisma.feedback.create({ data });
}

export async function getFeedbacks() {
    return await prisma.feedback.findMany();
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