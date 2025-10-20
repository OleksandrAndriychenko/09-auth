'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

export default function SignUpLayout({ children }: { children: ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        router.refresh();
    }, [router]);

    return (
        <main>
            {children}
        </main>
    );
}
