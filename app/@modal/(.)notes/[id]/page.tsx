import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import NoteModalPreview from './NotePreview.client';

interface NoteDetailsProps {
    params: Promise<{ id: string }>;
}

export default async function ModalPage({params}:NoteDetailsProps) {
    const { id } = await params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteModalPreview id={id} />
        </HydrationBoundary>
    );
}