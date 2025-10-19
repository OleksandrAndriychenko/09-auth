'use client';

import css from "./NoteForm.module.css"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/clientApi";
import { useRouter } from 'next/navigation';
import { useNoteDraftStore } from '@/lib/store/noteStore';

interface NoteFormProps {
    onClose?: () => void;
}





export default function NoteForm({ onClose }: NoteFormProps) {
    const queryClient = useQueryClient();
    const router = useRouter();
	const { draft, setDraft, clearDraft } = useNoteDraftStore();

	const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	) => {
		setDraft({
		...draft,
		[event.target.name]: event.target.value,
		});
	};

    const { mutate } = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["notes"] });
			clearDraft();
            if (onClose) {
				onClose();
			} else {
				router.back();
			}
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		mutate(draft);
    };
    return (
		<form className={css.form} onSubmit={handleSubmit}>
			<fieldset className={css.formGroup}>
				<label htmlFor="title">Title</label>
				<input
					type="text"
					id="title"
					name="title"
					className={css.input}
					value={draft?.title}
					onChange={handleChange}
				/>
			</fieldset>

			<fieldset className={css.formGroup}>
				<label htmlFor="content">Content</label>
				<textarea
					id="content"
					name="content"
					rows={8}
					className={css.textarea}
					value={draft?.content}
					onChange={handleChange}
				/>
			</fieldset>

			<fieldset className={css.formGroup}>
				<label htmlFor="tag">Tag</label>
				<select
					id="tag"
					name="tag"
					className={css.select}
					value={draft?.tag}
					onChange={handleChange}
				>
					<option value="Todo">Todo</option>
					<option value="Work">Work</option>
					<option value="Personal">Personal</option>
					<option value="Meeting">Meeting</option>
					<option value="Shopping">Shopping</option>
				</select>
			</fieldset>

			<fieldset className={css.actions}>
				<button type="button" onClick={() => (onClose ? onClose() : router.back())} className={css.cancelButton}>
					Cancel
				</button>
				<button type="submit" className={css.submitButton}>
					Create note
				</button>
			</fieldset>
		</form>
	);
}