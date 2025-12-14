export default function LoadingPage() {
    return(
        <>
            <div className="bg-[#31004A] w-full h-screen">
                <div className="flex justify-center items-center h-screen flex-col">
                    <h1 className="text-6xl font-bold text-center mb-5 text-white">BliSS</h1>
                    <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-white"></div>
                </div>
            </div>
        </>
    )
}