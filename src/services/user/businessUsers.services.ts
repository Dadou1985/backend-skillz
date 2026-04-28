import {
    createBusinessUser,
    deleteBusinessUser,
    getBusinessUserById,
    getBusinessUsers,
    updateBusinessUser
} from "../../models/user/businessUsers.repository.ts";

export async function createBusinessUserService(data: Parameters<typeof createBusinessUser>[0]) {
    return await createBusinessUser(data);
}

export async function getBusinessUsersService() {
    return await getBusinessUsers();
}

export async function getBusinessUserByIdService(id: Parameters<typeof getBusinessUserById>[0]) {
    return await getBusinessUserById(id);
}

export async function updateBusinessUserService(
    id: Parameters<typeof updateBusinessUser>[0],
    data: Parameters<typeof updateBusinessUser>[1]
) {
    return await updateBusinessUser(id, data);
}

export async function deleteBusinessUserService(id: Parameters<typeof deleteBusinessUser>[0]) {
    return await deleteBusinessUser(id);
}