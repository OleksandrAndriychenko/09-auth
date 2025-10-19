import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FormData } from '@/types/note';

type NoteDraftStore = {
    draft: FormData;
    setDraft: (note: FormData) => void;
    clearDraft: () => void;
};

const initialDraft = {
    title: '',
    content: '',
    tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
    persist(
        (set) => ({
        draft: initialDraft,
        setDraft: (note) => set(() => ({ draft: note })),
        clearDraft: () => set(() => ({ draft: initialDraft })),
        }),
        {
            name: 'note-draft',
            partialize: (state) => ({ draft: state.draft }),
        },
    ),
);