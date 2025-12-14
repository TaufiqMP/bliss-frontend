import Image from "next/image";
import EditUser from "./adminPage/EditUser";

export default function DetailsUsersPage() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="relative w-full max-w-4xl mx-auto border border-black/20 pb-10 bg-white rounded-lg shadow-md">

                {/* Top Section (tanpa background) */}
                <div className="relative w-full h-32">

                    {/* Profile Picture */}
                    <div className="absolute -bottom-14 left-10">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg group">

                            {/* Profile image */}
                            <Image
                                src="/images/profile.jpg"
                                alt="profile"
                                fill
                                className="object-cover"
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                <label
                                    htmlFor="profileUpload"
                                    className="cursor-pointer text-white text-sm px-3 py-1"
                                >
                                    Change
                                </label>
                                <input
                                    id="profileUpload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Info */}
                <div className="mt-20 ml-10">
                    <h1 className="text-2xl font-semibold">
                        Naufan Sigma Hasibuan
                    </h1>
                    <p className="text-gray-600">
                        naufantech@gmail.com
                    </p>
                </div>

                {/* Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 px-5">
                    <div className="border border-black/20 rounded-lg shadow-md py-6 px-8 bg-white">
                        <h2 className="font-medium mb-2">Account Info</h2>
                        <p className="text-sm text-gray-600">
                            Admin · 1231212412 · 2/10/22
                        </p>
                    </div>

                    <div className="border border-black/20 rounded-lg shadow-md py-6 px-8 bg-white">
                        <h2 className="font-medium mb-2">Activity</h2>
                        <p className="text-sm text-gray-600">
                            700 Called
                        </p>
                    </div>

                    <div className="border border-black/20 rounded-lg shadow-md py-6 px-8 bg-white">
                        <h2 className="font-medium mb-2">More Info</h2>
                        <p className="text-sm text-gray-600">
                            081319191991, Keramat
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
