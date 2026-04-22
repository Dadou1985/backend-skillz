import {
    createGuestUser,
    deleteGuestUser,
    getGuestUsers,
    getGuestUserById,
    updateGuestUser
} from '../../models/user/guestUsers.repository';

export async function createGuestUserService(data: Parameters<typeof createGuestUser>[0]) {
    return await createGuestUser(data);
}   

export async function getGuestUsersService() {
    return await getGuestUsers();
}

export async function getGuestUserByIdService(id: Parameters<typeof getGuestUserById>[0]) {
    return await getGuestUserById(id);
}

export async function updateGuestUserService(
    id: Parameters<typeof updateGuestUser>[0],
    data: Parameters<typeof updateGuestUser>[1]
) {
    return await updateGuestUser(id, data);
}

export async function deleteGuestUserService(id: Parameters<typeof deleteGuestUser>[0]) {
    return await deleteGuestUser(id);
}