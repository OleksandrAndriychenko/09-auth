'use client'
import { useAuth } from "@/lib/store/authStore";
import css from "./SignInPage.module.css";
import { useRouter } from "next/navigation";
import { login, RegisterUser } from "@/lib/api/clientApi";


const Login = () => {
    const { setUser } = useAuth()
    const router = useRouter()
    const handleAction = async (formData: FormData) => {
        const payload = Object.fromEntries(formData) as unknown as RegisterUser
        const user = await login(payload)
        setUser(user)
        router.replace('/profile')
    }
    return (
        <main className={css.mainContent}>
            <form className={css.form} action={handleAction}>
                <h1 className={css.formTitle}>Sign in</h1>

                <div className={css.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" className={css.input} required />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" className={css.input} required />
                </div>

                <div className={css.actions}>
                    <button type="submit" className={css.submitButton}>
                        Log in
                    </button>
                </div>

                <p className={css.error}>Error</p>
            </form>
        </main>
    )
}

export default Login