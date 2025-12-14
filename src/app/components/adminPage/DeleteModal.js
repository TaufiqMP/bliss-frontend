import React from "react";

export default function DeleteModal({ username, validationDelete, onDelete, user_id }) {
    return (
        <div className="fixed inset-0 bg-gray-700/75 flex flex-col gap-3 items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                <h2 className="text-2xl font-standar mb-4">Anda yakin ingin menghapus user {username}?</h2>
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={() => validationDelete()}
                        className="bg-gray-500 hover:bg-red-700 text-white font-normal py-2 px-4 rounded mr-2"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className="bg-gray-500 hover:bg-green-700 text-white font-normal py-2 px-4 rounded"
                        onClick={() => onDelete(user_id)}
                    >
                        Yakin
                    </button>
                </div>
            </div>
        </div>
    )
}