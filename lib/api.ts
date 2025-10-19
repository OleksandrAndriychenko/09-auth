// import axios from 'axios';
// import type { Note, FormData } from '../types/note';



// const nextServer = axios.create({
//     baseURL: 'https://notehub-api.goit.study',
//     withCredentials: true,
// });


// interface FetchNotesResponse {
//     notes: Note[];
//     totalPages: number;
// }


// export const fetchNotes = async (
//     searchText: string,
//     tag: string,
//     page: number
//     ): Promise<FetchNotesResponse> => {
//         const response = await nextServer.get<FetchNotesResponse>('/notes', {
//             params: {
//             ...(searchText && { search: searchText }),
//             ...(tag && tag !== 'All' && { tag }),
//             page,
//         },
//     });
//     return response.data;
// };

// export const createNote = async (newNote: FormData) => {
//     const response = await nextServer.post<Note>("/notes", newNote);
//     return response.data;
// };



// export const deleteNote = async (noteId: string) => {
//     const response = await nextServer.delete<Note>(`/notes/${noteId}`);
//     return response.data;
// };


// export const fetchNoteById = async (id: string) => {
//     const response = await nextServer.get<Note>(`/notes/${id}`);
//     return response.data;
// };