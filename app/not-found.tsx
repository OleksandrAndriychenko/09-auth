import Link from 'next/link';
import css from './Home.module.css'
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '404 - Page not found | NoteHub',
    description: 'Сторінка не знайдена. Можливо, вона була видалена або ніколи не існувала.',
    openGraph: {
        title: '404 - Page not found | NoteHub',
        description: 'Ця сторінка не існує. Поверніться на головну, щоб продовжити користування NoteHub.',
        url: 'https://notehub.com/404',
        images: [
            {
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: 'NoteHub 404 preview',
            },
        ],
    },
};


const NotFound = () => {
    return (
        <div>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
            <Link href="/">Go back home</Link>
        </div>
    );
};

export default NotFound;