"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { MdHome } from "react-icons/md";

export default function ForbiddenPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 text-center p-4">
            <h1 className="text-8xl md:text-9xl font-black text-purple-600">403</h1>
            <h2 className="text-2xl md:text-4xl font-bold mt-4 mb-2">
                Restricted Page!
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
                You dont have permission to access this page.
            </p>
            <button
                onClick={() => router.push('/dashboard')}

                className="flex items-center gap-2 px-6 py-3 text-lg font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white"
            >
                <MdHome />
            </button>
        </div>
    );
}