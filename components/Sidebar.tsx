'use client'

import {
    BoxesIcon,
    // PresentationIcon, 
    LogOut,
    ChartBarIncreasing
} from 'lucide-react'
import { signOut } from "next-auth/react";
import Link from 'next/link'

export default function Sidebar() {
    return <div className="flex h-screen">
        {/* <!-- Sidebar --> */}
        <div className="w-64 border shadow h-screen flex flex-col justify-between">
            <div>
                <div className="flex items-center justify-center h-16 border-b border-x-gray-400">
                    <span className="text-xl font-semibold text-blue-600">{`Tumangkar's Project`}</span>
                </div>
                <div className='flex flex-col justify-between'>
                    {/* <nav className="mt-4">
                        <ul>
                            <li className="hover:bg-slate-100 hover:text-indigo-600 font-semibold text-slate-600">
                                <a href="#" className="flex items-center px-4 py-2 gap-5">
                                    <PresentationIcon className='h-6 w-6' />
                                    Dashboard
                                </a>
                            </li>
                        </ul>
                    </nav> */}
                    <nav className="mt-4">
                        <ul>
                            {/* <!-- Menu Items --> */}
                            <li className="hover:bg-slate-100 hover:text-indigo-600 font-semibold text-slate-600">
                                <Link href="/stock" className="flex items-center px-4 py-2 gap-5">
                                    <BoxesIcon className='h-6 w-6' />
                                    Stock Barang
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <nav className="mt-4">
                        <ul>
                            {/* <!-- Menu Items --> */}
                            <li className="hover:bg-slate-100 hover:text-indigo-600 font-semibold text-slate-600">
                                <Link href="/pembelian" className="flex items-center px-4 py-2 gap-5">
                                    <ChartBarIncreasing className='h-6 w-6' />
                                    Pembelian
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            {/* <!-- Teams Section --> */}
            {/* <div className="mt-8">
                <h3 className="px-4 text-xs font-semibold uppercase text-gray-400">Atur Admin</h3>
                <ul>
                    <li className="flex items-center px-4 py-2 hover:bg-gray-800">
                        <div className="w-6 h-6 mr-3 rounded-full bg-gray-700 text-center text-sm font-medium">H</div>
                        Heroicons
                    </li>
                    <li className="flex items-center px-4 py-2 hover:bg-gray-800">
                        <div className="w-6 h-6 mr-3 rounded-full bg-gray-700 text-center text-sm font-medium">T</div>
                        Tailwind Labs
                    </li>
                </ul>
            </div> */}
            <nav className="mt-4">
                <ul>
                    {/* <!-- Menu Items --> */}
                    <li className="hover:bg-slate-100 hover:text-indigo-600 font-semibold text-slate-600 cursor-pointer">
                        <div onClick={() => signOut({ callbackUrl: "/sign-in" })} className="flex items-center px-4 py-2 gap-5">
                            <LogOut className='h-6 w-6' />
                            Keluar
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    </div>

}