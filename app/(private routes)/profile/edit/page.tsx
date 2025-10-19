'use client'

import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { useEffect, useState } from "react";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";



export default function EditProfile() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    const [userName, setUserName] = useState(user?.username || '');
    useEffect(() => {
        const fetchUser = async () => {
        try {
            const userData = await getMe();
            setUser(userData);
            setUserName(userData.username);
        } catch (error) {
            console.error('Помилка завантаження профілю:', error);
        }
        };

        fetchUser();
    }, []);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    };
    const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await updateMe(userName);
            router.push('/profile');
        } catch (error) {
            console.error('Помилка оновлення профілю:', error);
        };
    }
    const handleCancel = () => {
        router.push('/profile');
        };
        

    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>

                <Image
                        srs={user?.avatar || '/default-avatar.jpg'}
                        alt="User avatar"
                        width={120}
                        height={120}
                        className={css.avatar}
                    />

                <form className={css.profileInfo} onSubmit={handleSaveUser}>
                    <div className={css.usernameWrapper}>
                        <label htmlFor="username">Username:</label>
                        <input id="username"
                            type="text"
                            className={css.input}
                            value={userName}
                            onChange={handleChange}
                        />
                    </div>

                    <p>Email: {user?.email}</p>

                    <div className={css.actions}>
                        <button type="submit" className={css.saveButton}>
                        Save
                        </button>
                        <button type="button" className={css.cancelButton} onClick={handleCancel}>
                        Cancel
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}