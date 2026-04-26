import {
    createFeedback,
    deleteFeedback,
    getFeedbacks,
    getFeedbackById,
    updateFeedback,
} from '../../models/feedback/feedback.repository';

export async function createFeedbackService(data: Parameters<typeof createFeedback>[0]) {
    return await createFeedback(data);
}

export async function getAllFeedbackService(id: Parameters<typeof getFeedbacks>[0]) {
    return await getFeedbacks(id);
}

export async function getFeedbackByIdService(id: Parameters<typeof getFeedbackById>[0]) {
    return await getFeedbackById(id);
}

export async function updateFeedbackService(
    id: Parameters<typeof updateFeedback>[0],
    data: Parameters<typeof updateFeedback>[1]
) {
    return await updateFeedback(id, data);
}

export async function deleteFeedbackService(id: Parameters<typeof deleteFeedback>[0]) {
    return await deleteFeedback(id);
}