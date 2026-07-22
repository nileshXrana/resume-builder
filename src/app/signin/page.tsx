"use client"

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useForm, SubmitHandler } from "react-hook-form"
import { useEffect } from "react";
import { redirect } from "next/dist/client/components/navigation";

type Inputs = {
    email: string
    password: string
}

export default function SignIn() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        signIn('credentials', {
            email: data.email,
            password: data.password,
        }, { callbackUrl: "/dashboard" })
    }

    // useEffect(() => {
    //     const fetchSession = async () => {
    //         const res = await fetch("/api/auth/session");
    //         const session = await res.json();
    //         if (!session.user) {
    //             redirect("/login");
    //         }
    //         redirect("/dashboard");
    //     };

    //     fetchSession();
    // }, []);

    return (
        <div title="Login">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label title="Email">
                    <input {...register('email', { required: true })} type="email" placeholder="Email" />
                </label>
                <label title="Password">
                    <input {...register('password', { required: true })} type="password" placeholder="Password" />
                </label>
                <input type="submit" />
            </form>

            <Link href="/register">Register</Link>

            <button onClick={() => signIn('google', { callbackUrl: "/dashboard" })}>Sign in with Google</button>
        </div>
    )
}