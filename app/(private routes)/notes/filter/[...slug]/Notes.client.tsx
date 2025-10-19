'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchNotes } from '@/lib/api/clientApi';
import { useDebounce } from 'use-debounce';
import NoteList from '@/components/NoteList/NoteList';
import css from './NotesPage.module.css'
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Link from 'next/link';

type NotesProps = {
    initialTag?: string;
};

export default function Notes({ initialTag = '' }: NotesProps) {
    const [searchValue, setSearchValue] = useState('');
    const [page, setPage] = useState(1);
    const [debouncedSearchValue] = useDebounce(searchValue, 300);


    useEffect(() => {
        setPage(1);
    }, [initialTag]);


    const updateSearchQuery = ((value: string) => {
            setSearchValue(value);
            setPage(1);
        }
    );

    const { data } = useQuery({
        queryKey: ['notes', debouncedSearchValue, page, initialTag],
        queryFn: () => fetchNotes(debouncedSearchValue, initialTag, page),
        placeholderData: keepPreviousData,
    });

    return (
        <div className={css.app}>
	        <header className={css.toolbar}>
		        {<SearchBox onChange={updateSearchQuery}/>}
                {(data && data.totalPages > 1) && <Pagination totalPages={data.totalPages} currentPage={page} onPageChange={setPage} />}
		        <Link href="/notes/action/create" className={css.button}>
					Create note +
				</Link>
            </header>
            {(data && data.notes.length >= 1) && <NoteList notes={data.notes} />}
        </div>
    );
}