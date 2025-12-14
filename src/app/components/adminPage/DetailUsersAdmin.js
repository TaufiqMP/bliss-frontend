"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CardUser from "./CardUsers";
import EditUser from "./EditUser";
import DeleteModal from "./DeleteModal";
import UserInfo from "./UserInfo";
import UserProfile from "./UsersProfile";
import LoadingPage from "../LoadingPage";
import AlertSuccess from "../Alert-Succes";
import AlertError from "../Alert";
import { deleteUserById, getUsersById, uploadImageUser, editUserData } from "@/utils/api";

export default function DetailsUsersAdminPage() {
    const { id } = useParams();
    const baseUrl = `https://bliss-backend-production.up.railway.app`
    const [userData, setUserData] = useState(null);
    const [validationDelete, setValidationDelete] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const { data } = await getUsersById(id);
                console.log('data', data.user);
                if (error) {
                    throw new Error("Gagal mengambil data user");
                }
                const user = data.user;
                setUserData(user);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <div className="text-enter p-10"><LoadingPage /></div>;
    if (error) return <div className="text-centcer p-10 text-red-500">Error: {error}</div>;
    if (!userData) return <div className="text-center p-10">User tidak ditemukan.</div>;

    async function onDeleteHandler() {
        const { error } = await deleteUserById(userData.user_id);
        if (!error) {
            setToastMessage({ type: 'success', text: 'User berhasil dihapus!' });
        } else {
            setToastMessage({ type: 'error', text: 'Gagal menghapus user.' });
        }
        setTimeout(() => {
            setToastMessage(null);
            if (!error) {
                window.location.href = '/dashboard-admin';
            }
        }, 1500);
        setValidationDelete(false);
    }

    async function onCloseModal() {
        setEditModal(false)
    }

    async function onEditHandler(payload) {
        const { error, data } = await editUserData(payload, userData.user_id);
        console.log("tes", data);
        if (!error && data) {
            const updatedUser = data.userUpdate;
            setUserData(prevData => ({ ...prevData, ...updatedUser }));
            setToastMessage({ type: 'success', text: 'data berhasil diperbarui!' });
        } else {
            setToastMessage({ type: 'error', text: 'Gagal memperbarui data user.' });
        }
        setTimeout(() => {
            setToastMessage(null);
        }, 1500);
        onCloseModal();
    }

    async function handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        const res = await uploadImageUser(file, userData.user_id);
        try {
            if (res.status === 'success') {
                const newImageUrl = res.data.imageUrl;
                setUserData(prevData => ({ ...prevData, image_url: newImageUrl }));
                setToastMessage({ type: 'success', text: 'Gambar profil berhasil diperbarui!' });
            } else {
                throw new Error(res.message || 'Gagal mengunggah gambar.');
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
            <div className="flex justify-center my-7 items-start md:items-center min-h-screen text-center p-4">
                <div className="relative w-full max-w-4xl mx-auto border border-black/20 pb-10 rounded-lg mt-16 md:mt-0">
                    <UserProfile imageProfile={userData.image_url} onImageChange={handleImageUpload} unoptimized />
                    <UserInfo
                        username={userData.username}
                        email={userData.email}
                        validationDelete={() => setValidationDelete(true)}
                        editModal={() => setEditModal(true)}
                    />
                    {validationDelete && (
                        <DeleteModal
                            username={userData.username}
                            validationDelete={setValidationDelete}
                            onDelete={onDeleteHandler}
                        />
                    )}
                    {editModal && (
                        <EditUser
                            currentEmail={userData.email}
                            currentUsername={userData.username}
                            onSave={(data) => onEditHandler(data, userData.user_id)}
                            onClose={onCloseModal}
                        />
                    )}
                    <CardUser
                        id={userData.user_id}
                        score={userData.score}
                        phone={userData.phone_number}
                    />
                </div>
            </div>
        </>
    );
}