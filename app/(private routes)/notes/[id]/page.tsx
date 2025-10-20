import { fetchNoteById } from '@/lib/api/serverApi'
import NoteDetailsClient from './NoteDetails.client'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import type { Metadata } from 'next';

interface Props {
    params: Promise<{ id: string }>
}


export async function generateMetadata(props: Props): Promise<Metadata> {
	const { id } = await props.params;
	const note = await fetchNoteById(id);

	const title = `NoteHub — ${note.title}`;
	const description = note.content.length > 120
		? `${note.content.slice(0, 30)}...`
		: note.content || 'Деталі нотатки на NoteHub';

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url: `https://notehub.app/notes/${id}`,
			images: [
				{
					url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
					width: 1200,
					height: 630,
					alt: 'NoteHub note preview',
				},
			],
		},
	};
}




const Details = async ({ params }: Props) => {
    const { id } = await params

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient />
        </HydrationBoundary>
    )
}

export default Details