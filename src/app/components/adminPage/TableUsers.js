"use client";

import { useRouter } from "next/navigation";
import { CiExport } from "react-icons/ci";
import AlertSuccess from "../Alert-Succes";
import AlertError from "../Alert";
import { useState, useEffect } from "react";
import { decodeAccessToken } from "@/utils/jwt";
import { exportLeaderboard } from "@/utils/api";

export default function UsersTable() {
    const baseUrl = `https://bliss-backend-production.up.railway.app`;
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);
    const [userId, setUserId] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const initialize = async () => {
            try {
                const id = await decodeAccessToken();
                setUserId(id);
            } catch (err) {
                setError("Gagal mendekode token");
            }
        };

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${baseUrl}/users/`);
                const responseJson = await response.json();
                const { error, data } = responseJson;
                if (error || !data || !data.users) {
                    throw new Error("Gagal mengambil data sales");
                }
                const users = data.users.map((user, index) => ({
                    peringkat: index + 1,
                    id: user.user_id,
                    username: user.username,
                    email: user.email,
                    score: user.score
                }));

                setUsersData(users);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        initialize();
        fetchData();
    }, [baseUrl]);

    useEffect(() => {
        if (toastMessage) {
            const timeout = setTimeout(() => {
                setToastMessage(null);
            }, 1500);
            return () => clearTimeout(timeout);
        }
    }, [toastMessage]);

    const handleRowClick = (userId) => {
        router.push(`/dashboard-admin/details-users/${userId}`);
    };

    async function onExportHandler(userId) {
        if (!userId) {
            setToastMessage({ type: 'error', text: 'User ID tidak ditemukan' });
            return;
        }
        try {
            const response = await exportLeaderboard(userId);
            // Assuming exportLeaderboard returns the blob directly on success
            if (response.ok) {
                 setToastMessage({ type: 'success', text: 'Report berhasil dieksport!' });
                 // Handle the file download
                 const blob = await response.blob();
                 const url = window.URL.createObjectURL(blob);
                 const a = document.createElement('a');
                 a.href = url;
                 a.download = "leaderboard.xlsx";
                 document.body.appendChild(a);
                 a.click();
                 a.remove();

            } else {
                const responseJson = await response.json();
                const { error } = responseJson;
                setToastMessage({ type: 'error', text: error || 'Gagal mengeksport report' });
            }
        } catch (err) {
            setToastMessage({ type: 'error', text: 'Terjadi kesalahan saat export' });
        }
    }

    if (loading) {
        return <div className="text-center p-6 bg-white rounded-lg shadow-md">Memuat data...</div>;
    }

    if (error) {
        return <div className="text-center p-6 bg-white rounded-lg shadow-md text-red-500">Error: {error}</div>;
    }

    return (
        <>
            <div className="fixed top-5 right-130 z-50 w-max animate-bounce">
                {toastMessage && toastMessage.type === 'success' && (
                    <AlertSuccess Message={toastMessage.text} />
                )}
                {toastMessage && toastMessage.type === 'error' && (
                    <AlertError ErrorMsg={toastMessage.text} />
                )}
            </div>
            <div className="overflow-x-auto min-w-[250px] bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center w-full mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Leaderboard Users</h2>
                    <div className="flex items-center gap-2">
                        <button onClick={() => onExportHandler(userId)} className="btn hover:bg-purple-500 bg-gray-200 w-max h-auto rounded-lg py-1 px-1 text-gray-900"><CiExport />Export</button>
                    </div>
                </div>
                <table className="table w-full">
                    <thead>
                        <tr className="border border-gray-200 text-center text-gray-900 bg-gray-200">
                            <th className="font-semibold">Peringkat</th>
                            <th className="font-semibold">User ID</th>
                            <th className="font-semibold">username</th>
                            <th className="font-semibold">Email</th>
                            <th className="font-semibold">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersData.map((user) => (
                            <tr key={user.id} onClick={() => handleRowClick(user.id)} className="hover:bg-gray-100 text-gray-900 transition-colors border border-gray-200 rounded-lg cursor-pointer text-center">
                                <td><div className="font-bold">{user.peringkat}</div></td>
                                <td><div className="font-bold">{user.id}</div></td>
                                <td><div className="font-bold">{user.username}</div></td>
                                <td><div className="font-bold">{user.email}</div></td>
                                <td><div className="font-bold">{user.score}</div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

