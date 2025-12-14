import React from "react";
import { MdDeleteOutline, MdOutlineMode } from "react-icons/md";

export default function UserInfo({ username, email, validationDelete, editModal }) {
    return (
        <div className="mt-20 ml-10 text-left">
            <h1 className="text-2xl font-semibold">
                {username}
            </h1>
            <p className="text-gray-600">{email}</p>
            <div className="flex items-center gap-2">
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white mt-2 font-medium rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-sm active:scale-95 hover:-translate-y-1 cursor-pointer"
                    onClick={() => validationDelete()}
                >
                    <MdDeleteOutline className="text-xl" />
                </button>
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white mt-2 font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 shadow-sm active:scale-95 hover:-translate-y-1 cursor-pointer"
                    onClick={() => editModal()}
                >
                    <MdOutlineMode className="text-xl" />
                </button>
            </div>
        </div>
    )
}