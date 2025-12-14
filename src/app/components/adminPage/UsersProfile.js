import React from "react";
import { MdOutlineMode } from "react-icons/md";
import Image from "next/image";

export default function UserProfile({ imageProfile, onImageChange }) {
    return (
        <div className="relative w-full h-32 overflow-visible">

            {/* Profile Picture */}
            <div className="absolute -bottom-14 left-10">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg group">

                    <Image
                        src={
                            imageProfile ||
                            "https://cmldqhfeingvkdeurufd.supabase.co/storage/v1/object/public/avatar/default.jpg"
                        }
                        alt="profile"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 800px) 50vw, 33vw"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <label
                            htmlFor="profileUpload"
                            className="cursor-pointer text-white"
                        >
                            <MdOutlineMode className="text-xl" />
                        </label>
                        <input
                            id="profileUpload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={onImageChange}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}
