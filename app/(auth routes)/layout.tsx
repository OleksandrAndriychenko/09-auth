import type { ReactNode } from 'react';

export default function SignUpLayout({ children }: { children: ReactNode }) {
    return (
        <main>
            {children}
        </main>
    );
}
