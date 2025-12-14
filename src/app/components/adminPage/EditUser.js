import React, { useState } from "react";
import useInput from "@/hooks/useInput";

export default function EditUser({ onSave, onClose, currentEmail, currentUsername }) {
    const [userName, onUserNameChange] = useInput("");
    const [email, onEmailChange] = useInput("");


    const onSubmitHandler = (event) => {
        event.preventDefault();
        onSave({
            userName,
            email,
        });
    }
    return (
        <div className="fixed inset-0 bg-gray-700/75 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-10 rounded-xl shadow-xl w-1/2">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Data</h2>
                <form onSubmit={onSubmitHandler} className="space-y-5">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-normal mb-1 text-left">
                                Username
                            </label>
                            <input
                                type="text"
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                                value={userName}
                                onChange={onUserNameChange}
                                placeholder={currentUsername}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-normal mb-1 text-left">
                                email
                            </label>
                            <input
                                type="text"
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                                value={email}
                                onChange={onEmailChange}
                                placeholder={currentEmail}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end pt-4 gap-3">
                        <button
                            type="button"
                            onClick={() => onClose()}
                            className="bg-gray-700 hover:bg-red-600 text-white font-medium py-2 px-5 rounded-lg transition"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="bg-gray-700 hover:bg-green-600 text-white font-medium py-2 px-5 rounded-lg transition"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}