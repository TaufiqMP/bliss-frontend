'use client';
import { MdEdit, MdDelete } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import ProtectedRoutes from '../components/ProtectedHocs';
import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from "next/link";
import EditUser from "../components/EditUser";
import { updateUserProfile } from "@/utils/api";
import { MdOutlineMode } from "react-icons/md";
import AlertSuccess from "../components/Alert-Succes";
import AlertError from "../components/Alert";

function DetailsUsersPage({ user, token, userId }) {
    const baseUrl = `https://bliss-backend-production.up.railway.app`
    const [currentUser, setCurrentUser] = useState(user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        address: '',
    });

    const handleSave = async (payload) => {
        const response = await updateUserProfile(payload, token);

        setCurrentUser(prev => ({
            ...prev,
            ...response.data
        }));
    };

    async function handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        const formData = new FormData();
        formData.append('profileImage', file);
        const user_id = userId;
        try {
            const response = await fetch(`${baseUrl}/users/upload/${user_id}`, {
                method: 'POST',
                credentials: "include",
                body: formData
            });
            const responseJson = await response.json();

            if (response.ok && responseJson.status === 'success') {
                const newImageUrl = responseJson.data.imageUrl;
                setUserData(prevData => ({ ...prevData, image_url: newImageUrl }));
                setToastMessage({ type: 'success', text: 'Gambar profil berhasil diperbarui!' });
            } else {
                throw new Error(responseJson.message || 'Gagal mengunggah gambar.');
            }
        } catch (error) {
            setToastMessage({ type: 'error', text: error.message });
        }
        setTimeout(() => {
            setToastMessage(null);
        }, 2000);
    }


    return (
        <>
            <div className="fixed top-5 right-5 z-50 w-max animate-bounce">
                {toastMessage && toastMessage.type === 'success' && (
                    <AlertSuccess Message={toastMessage.text} />
                )}
                {toastMessage && toastMessage.type === 'error' && (
                    <AlertError ErrorMsg={toastMessage.text} />
                )}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto">
                {/* Profile Header Section */}
                <div className="flex jusitfy-start items-center w-full py-3">
                    <Link href={'/dashboard'}>
                        <FaArrowLeft size={16} className="text-gray-600 hover:text-gray-900 mr-4 cursor-pointer" />
                    </Link>
                </div>
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-6">
                        {/* Profile Picture */}
                        <div className="group relative w-28 h-28 rounded-full ring ring-primary ring-offset-2 overflow-hidden mr-2">
                            <Image
                                src={user.image_url || "/defaultProfile.png"}
                                alt="Profile Picture"
                                width={50}
                                height={50}
                                className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                <label
                                    htmlFor="profileUpload"
                                    className="cursor-pointer text-white text-sm px-3 py-1"
                                >
                                    <MdOutlineMode className="text-xl" />
                                </label>
                                <input
                                    id="profileUpload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                            </div>
                        </div>

                        {/* User Info */}
                        <div>
                            <h1 className="font-semibold text-2xl text-gray-800">{currentUser.username}</h1>
                            <p className="text-sm text-gray-600 mt-1">{currentUser.email}</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors border border-gray-300 hover:border-blue-400">
                            <MdEdit size={18} />
                            <span className="font-medium">Edit</span>
                        </button>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg shadow-sm p-4 text-center">
                        <span className="text-sm text-blue-700 font-medium">Leaderboard</span>
                        <p className="text-2xl font-bold text-blue-900 mt-1">#3</p>
                    </div>
                </div>

                {/* User Details Section */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Role</label>
                        <div className="mt-1 px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-800">
                            {currentUser.role_id === 2 ? "Sales" : "Admin"}
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Status</label>
                        <div className="mt-1 px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-800">
                            <span className="inline-flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                {currentUser.status || "-"}
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Phone</label>
                        <div className="mt-1 px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-800">
                            {currentUser.phone_number || "-"}
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Address</label>
                        <div className="mt-1 px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-800">
                            {currentUser.address || "-"}
                        </div>
                    </div>

                    <EditUser
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        userData={userData}
                        onSave={handleSave}
                        token={token}
                        userId={userId}
                    />
                </div>
            </div>
        </>
    );
}

export default ProtectedRoutes(DetailsUsersPage);