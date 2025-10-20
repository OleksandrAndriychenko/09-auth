import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/serverApi';
import Notes from './Notes.client';
import type { Metadata } from 'next';


export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
	const tag = params.slug?.[0] && params.slug[0] !== 'All' ? params.slug[0] : '';
	const readableTag = tag || 'All Notes';

	const title = `NoteHub — Нотатки з фільтром: ${readableTag}`;
	const description = `Переглядайте нотатки, відфільтровані за тегом "${readableTag}". Зручно організовуйте свої думки та завдання.`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url: `https://notehub.app/notes/filter/${tag || 'All'}`,
			images: [
				{
					url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
					width: 1200,
					height: 630,
					alt: 'NoteHub filtered notes preview',
				},
			],
		},
	};
}


export default async function FilteredNotesPage({params}: {params: Promise<{ slug: string[] }>}) {
    const { slug } = await params;
    const tag = slug?.[0] !=='All' ? slug?.[0] : "";
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['notes', '', 1, tag],
        queryFn: () => fetchNotes('', tag, 1),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Notes initialTag={tag} />
        </HydrationBoundary>
    );
}