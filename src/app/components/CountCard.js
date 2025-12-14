import { FaUser } from 'react-icons/fa';

export default function CountCard({ openClosed }) {
  return (
    <div className="flex justify-start items-center border border-black/20 rounded-lg w-full shadow-lg">
      {/* Belum Dihubungi */}
      <div className="flex flex-col items-center bg-[#31004A] text-center flex-1 w-[80%] rounded-lg shadow-lg py-6">
        <div className="flex items-center text-white mb-1">
          <FaUser className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">Belum Dihubungi</span>
        </div>
        <p className="text-2xl font-semibold text-red-400">{openClosed.openCount}</p>
      </div>

      {/* Sudah Dihubungi */}
      <div className="flex flex-col items-center text-center flex-1 w-full">
        <div className="flex items-center text-black mb-1">
          <FaUser className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">Sudah Dihubungi</span>
        </div>
        <p className="text-2xl font-semibold text-green-700">{openClosed.closedCount}</p>
      </div>
    </div>
  );
}
