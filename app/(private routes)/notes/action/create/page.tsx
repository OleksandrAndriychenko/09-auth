import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm"
import type { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'NoteHub — Створити нову нотатку',
    description: 'Створіть нову нотатку в NoteHub, щоб зберегти важливі ідеї, завдання або особисті думки з тегами та зручним форматуванням.',
    openGraph: {
        title: 'NoteHub — Створити нову нотатку',
        description: 'Сторінка для створення нової нотатки в застосунку NoteHub. Організуйте свої думки легко та ефективно.',
        url: 'https://notehub.app/notes/action/create',
        images: [
            {
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: 'NoteHub create note preview',
            },
        ],
    },
};


export default function CreateNote() {
    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                {<NoteForm/>}
            </div>
        </main>
    )
}