import { useRouter } from "next/navigation";
import { CiExport } from "react-icons/ci";
import AlertSuccess from "../Alert-Succes";
import AlertError from "../Alert";
import { decodeAccessToken } from "@/utils/jwt";
import { useState, useEffect } from "react";
import { getAccessToken } from "@/utils/cookies";
import { decodeAccessToken } from "@/utils/jwt";

export default async function UsersTable() {
    const baseUrl = `https://bliss-backend-production.up.railway.app`
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);
    const router = useRouter();
    const token = await getAccessToken();
    const userId = await decodeAccessToken(token);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${baseUrl}/users/`);
                const responseJson = await response.json();
                const { error, data } = await responseJson;
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

        fetchData();
    }, []);

    const handleRowClick = (userId) => {
        router.push(`/dashboard-admin/details-users/${userId}`);
    };

    async function onExportHandler() {
    try {
        const response = await fetch(`${baseUrl}/export`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id: userId,
        }),
        });

        const responseJson = await response.json();
        const { error } = responseJson;

        if (!error) {
        setToastMessage({ type: "success", text: "report berhasil dieksport!" });
        } else {
        setToastMessage({ type: "error", text: "Gagal mengeksport report" });
        }
    } catch (err) {
        setToastMessage({ type: "error", text: "Terjadi kesalahan saat export" });
    } finally {
        setTimeout(() => {
        setToastMessage(null);
        }, 1500);
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
                        <button onClick={onExportHandler} className="btn hover:bg-purple-500 bg-gray-200 w-max h-auto rounded-lg py-1 px-1 text-gray-900"><CiExport />Export</button>
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
                    {/* BODY (Data Baris) */}
                    <tbody>
                        {usersData.map((user) => (
                            <tr key={user.id} onClick={() => handleRowClick(user.id)} className="hover:bg-gray-100 text-gray-900 transition-colors border border-gray-200 rounded-lg cursor-pointer text-center">
                                <td>
                                    <div className="font-bold">{user.peringkat}</div>
                                </td>
                                <td>
                                    <div className="font-bold">{user.id}</div>
                                </td>
                                <td>
                                    <div className="font-bold">{user.username}</div>
                                </td>
                                <td>
                                    <div className="font-bold">{user.email}</div>
                                </td>
                                <td>
                                    <div className="font-bold">{user.score}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}