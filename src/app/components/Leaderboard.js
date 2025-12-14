import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] });

import Image from 'next/image';

export default function Leaderboard({ topThree }) {
    // Pastikan topThree selalu array
    const paddedTopThree = [...(topThree || [])];
    while (paddedTopThree.length < 3) paddedTopThree.push(null);

    return (
        <>
            <div className="flex md:flex-row flex-row overflow-x-auto md:justify-center items-center gap-3 w-full whitespace-nowrap">
                {paddedTopThree.map((user, index) => {
                    // Tentukan ukuran kotak berdasarkan posisi
                    const isFirst = index === 0;
                    const heightClass = isFirst ? "h-[200px]" : "h-[170px] md:h-[200px]";
                    const widthClass = isFirst ? "md:w-[46%]" : "md:w-[28%]";
                    return (
                        <div
                            key={index}
                            className={`flex flex-col ${heightClass} w-full ${widthClass} rounded-lg shadow-md border border-black/20 p-6 relative text-white [box-shadow:inset_0_2px_0_0_#31004A]`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex justify-start items-center w-full">
                                    <div className={`w-${isFirst ? "16" : "12"} h-${isFirst ? "16" : "12"} rounded-full border-2 border-white mr-4 relative overflow-hidden shadow-lg`}>
                                        {user ? (
                                            <Image
                                                src={user.image_url || "/testpict.jpeg"}
                                                fill
                                                alt="Profile"
                                                className="object-cover rounded-full"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-full text-black text-xs">
                                                Tidak Ada
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <p className={`font-semibold ${isFirst ? "text-lg" : "text-[15px]"} text-black`}>
                                            {user ? user.username : "Users Tidak Ada!"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center mt-6 mb-2 text-black">
                                <div className="flex flex-col items-center">
                                    <span className="text-[15px]">Approved</span>
                                    <span className="font-bold text-xl">
                                        {user ? user.score : "-"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
