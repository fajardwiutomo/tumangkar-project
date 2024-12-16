/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'
import { useSession } from "next-auth/react"
import { useEffect } from "react";

export default function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [pending, setPending] = useState(false);
    const { data: session, status } = useSession()
    const router = useRouter();

    console.log(session, status)

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/stock");
        } else if (status === "unauthenticated") {
            router.push("/sign-in");
        }
    }, [session, status])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPending(true);

        const res = await signIn("credentials", {
            redirect: false,
            username,
            password
        });

        if (res?.ok) {
            setPending(false);
            router.push("/stock");
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Selamat datang!",
            });
        } else if (res?.error) {
            setPending(false);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: res.error,
            });
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Masukkan akun anda
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="text" className="block text-sm/6 font-medium text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="text"
                                    name="text"
                                    type="text"
                                    required
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                    disabled={pending}
                                    // autoComplete="text"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                                {/* <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div> */}
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    disabled={pending}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button

                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Masuk
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Powered by{' '}
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Fajar Dwi Utomo
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}