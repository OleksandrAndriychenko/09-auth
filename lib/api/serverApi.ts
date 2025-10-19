import { Note } from "@/types/note";
import { nextServerApi, SessionResponse } from "./api";
import { cookies } from "next/headers";
import { User } from "@/types/user";

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

export const fetchNotes = async (
    searchText: string,
    tag: string,
    page: number
    ): Promise<FetchNotesResponse> => {
        const cookieStore = await cookies()
        const response = await nextServerApi.get<FetchNotesResponse>('/notes', {
            headers: { Cookie: cookieStore.toString() },
            params: {
            ...(searchText && { search: searchText }),
            ...(tag && tag !== 'All' && { tag }),
            page,
        },
    });
    return response.data;
};

export const fetchNoteById = async (id: string) => {
    const cookieStore = await cookies()
    const response = await nextServerApi.get<Note>(`/notes/${id}`, {
        headers: {
            ...(cookieStore && { Cookie: cookieStore.toString() }),
        },
    });
    return response.data;
};

export const getMe = async () => {
    const cookieStore = await cookies()
    const { data } = await nextServerApi.get<User>(`/auth/me`, {
        headers: { Cookie: cookieStore.toString() },
    })
    return data
}

export const checkSession = async () => {
    const cookieStore = await cookies()
    const res = await nextServerApi.get<SessionResponse>(`/auth/session`, {
        headers: { Cookie: cookieStore.toString() },
    })
    return res
}