import Link from "next/link";
import css from "./ProfilePage.module.css";
import Image from "next/image";
import { getMe } from "@/lib/api/serverApi";
import type { Metadata } from 'next';




export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: 'NoteHub — Профіль користувача',
        description: 'Перегляньте свій профіль, оновіть дані та керуйте нотатками.',
        openGraph: {
        title: 'NoteHub — Профіль користувача',
        description: 'Ваш персональний простір для нотаток і завдань.',
        url: 'https://notehub.app/profile',
        images: [
            {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: 'NoteHub profile preview',
            },
        ],
        },
    };
};


export default async function Profile() {
    const user = await getMe();
    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <div className={css.header}>
                    <h1 className={css.formTitle}>Profile Page</h1>
                    <Link href="/profile/edit" className={css.editProfileButton}>
                    Edit Profile
                    </Link>
                </div>
                <div className={css.avatarWrapper}>
                    <Image
                        src={user?.avatar || '/default-avatar.jpg'}
                        alt="User avatar"
                        width={120}
                        height={120}
                        className={css.avatar}
                    />
                </div>
                <div className={css.profileInfo}>
                    <p>
                        Username: {user?.username}
                    </p>
                    <p>
                        Email: {user.email}
                    </p>
                </div>
            </div>
        </main>
    )
}