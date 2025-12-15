'use client';
import { useEffect, useState } from "react";
import { CiExport } from "react-icons/ci";
import { getGreeting } from "@/utils/timeUtils";
import { getUsersById } from "@/utils/api";
import CardAdmin from "../components/adminPage/CardAdmin";
import { Inter } from 'next/font/google'
import UsersTable from "../components/adminPage/TableUsers";
import { uploadCSV } from "@/utils/api";
// import ProtectedRoutes from "../components/ProtectedHocs";
import ProtectedRoutesAdmin from "../components/ProtectedHocsAdmin";

const inter = Inter({ subsets: ['latin'] });

function AdminPage({ user }) {
    const currentGreeting = getGreeting();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const nameAdmin = async () => {
            try {
                const res = await fetch(`https://bliss-backend-production.up.railway.app/users/${user.user_id}`, {
                    credentials: "include"
                });
                const data = await res.json();

                setName(data?.data?.user?.username || "Data tidak ada!");
            } catch (error) {
                console.error(error);
            }
        };
        nameAdmin();
    }, [user.user_id]);

    const handleSave = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            alert("Silakan pilih file CSV terlebih dahulu");
            return;
        }

        try {
            setIsLoading(true);

            const result = await uploadCSV(selectedFile);
            console.log("Upload CSV success:", result);

            alert("Dataset berhasil diunggah");

            // reset & tutup modal
            setSelectedFile(null);
            setIsModalOpen(false);

        } catch (error) {
            console.error(error);
            alert("Gagal upload CSV");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="w-full px-4 py-6 md:px-6 md:py-10">
                <div className={`${inter.className} leading-tight`}>
                    <p className="text-xl md:text-[24px] text-black font-semibold">{currentGreeting}, admin <span className="text-[#31004A] bg-gray-100 p-1 rounded-md">{name}</span></p>
                    <div className="flex flex-col mt-5 gap-5">
                        <div className="flex flex-col gap-5 w-full">
                            <CardAdmin />
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full md:w-max bg-[#31004A] text-white rounded-md hover:bg-[#3C0075] transition-all shadow-sm py-2 px-4"
                            >
                                <div className="flex items-center justify-center gap-1">
                                    <CiExport />
                                    <p className="font-light">Input Dataset Nasabah</p>
                                </div>
                            </button>
                            <div className={`${inter.className} leading-tight mb-5 flex justify-between items-center w-full md:w-[92%]`}>
                            </div>
                            <div className="overflow-x-auto border border-gray-300 shadow-mdxl sm:rounded-lg">
                                <UsersTable />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-700/75 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                        <h2 className="text-2xl font-bold mb-4">Masukkan Data Nasabah Baru</h2>
                        <form onSubmit={handleSave}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file_input">
                                    Upload file
                                </label>
                                <input
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
                                    id="file_input"
                                    type="file"
                                    accept=".csv"
                                    onChange={(e) => setSelectedFile(e.target.files[0])}
                                />
                                <p className="mt-1 text-sm text-gray-500" id="file_input_help">
                                    .csv
                                </p>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`${isLoading ? "bg-gray-400" : "bg-green-500 hover:bg-green-700"
                                        } text-white font-bold py-2 px-4 rounded`}
                                >
                                    {isLoading ? "Mengunggah..." : "Simpan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProtectedRoutesAdmin(AdminPage);