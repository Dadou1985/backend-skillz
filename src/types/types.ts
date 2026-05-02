export interface RoomAmenetiesRepository {
    [key: string]: string
}

export type userCategory = 'business' | 'guest';

export interface AuthPayload {
    email: string;
    password: string;
    category: userCategory;
}