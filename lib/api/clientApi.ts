import { Note } from "@/types/note";
import { nextServerApi, SessionResponse } from "./api";
import { User } from "@/types/user";

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

export interface RegisterUser {
    email: string,
    password: string
}


export const fetchNotes = async (
    searchText: string,
    tag: string,
    page: number
    ): Promise<FetchNotesResponse> => {
        const response = await nextServerApi.get<FetchNotesResponse>('/notes', {
            params: {
            ...(searchText && { search: searchText }),
            ...(tag && tag !== 'All' && { tag }),
            page,
        },
    });
    return response.data;
};

export const fetchNoteById = async (id: string) => {
    const response = await nextServerApi.get<Note>(`/notes/${id}`);
    return response.data;
};

export const createNote = async (newNote: FormData) => {
    const response = await nextServerApi.post<Note>("/notes", newNote);
    return response.data;
};

export const deleteNote = async (noteId: string) => {
    const response = await nextServerApi.delete<Note>(`/notes/${noteId}`);
    return response.data;
};

export const register = async (body: RegisterUser) => {
    const { data } = await nextServerApi.post<User>(`/auth/register`, body)
    return data
}

export const login = async (body: RegisterUser) => {
    const { data } = await nextServerApi.post<User>(`/auth/login`, body)
    return data
}

export const logOut = async () => {
    await nextServerApi.post(`/auth/logout`)
}

export const checkSession = async () => {
    const { data } = await nextServerApi.get<SessionResponse>(`/auth/session`)
    return data.success
}

export const getMe = async () => {
    const { data } = await nextServerApi.get<User>(`/users/me`)
    return data
}

export const updateMe = async (userName: string) => {
    const { data } = await nextServerApi.post<User>(`/users/me`, userName)
    return data
}