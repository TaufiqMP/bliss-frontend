import React from "react";
export default function cardUser({ id, score, phone }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5 px-5">
            <div className="flex flex-col justify-center items-center group relative overflow-hidden rounded-2xl p-6 bg-card border-2 border-primary/20 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                <h2 className="font-medium mb-2 text-gray-600">User Id</h2>
                <p className="text-sm text-gray-700">
                    {id}
                </p>
            </div>

            <div className="flex flex-col justify-center items-center group relative overflow-hidden rounded-2xl p-6 bg-card border-2 border-primary/20 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                <h2 className="font-medium mb-2 text-gray-600">Leaderboard Score</h2>
                <p className="text-sm text-gray-700">
                    {score}
                </p>
            </div>
            <div className="flex flex-col justify-center items-center group relative overflow-hidden rounded-2xl p-6 bg-card border-2 border-primary/20 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                <h2 className="font-medium mb-2 text-gray-600">Phone Number</h2>
                <p className="text-sm text-gray-700">
                    {phone}
                </p>
            </div>
        </div>
    )
};
