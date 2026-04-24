import {
    createGuestToken,
    deleteGuestToken,
    getGuestTokenById,
    getGuestTokens,
    updateGuestToken,
} from "../../models/guestToken/guestToken.repository";

export async function createGuestTokenService(data: Parameters<typeof createGuestToken>[0]) {
    return await createGuestToken(data);
}

export async function getAllGuestTokensService() {
    return await getGuestTokens();
}

export async function getGuestTokenByIdService(id: Parameters<typeof getGuestTokenById>[0]) {
    return await getGuestTokenById(id);
}

export async function updateGuestTokenService(
    id: Parameters<typeof updateGuestToken>[0],
    data: Parameters<typeof updateGuestToken>[1]
) {
    return await updateGuestToken(id, data);
}

export async function deleteGuestTokenService(id: Parameters<typeof deleteGuestToken>[0]) {
    return await deleteGuestToken(id);
}