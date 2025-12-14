"use client";

import { useState, useEffect } from "react";
import { editNasabahData, incrementLeaderboard } from "@/utils/api";

export default function DetailPopup({ isOpen, onClose, data, setData, setNasabahList, token, userId}) {
  const [newStatus, setNewStatus] = useState("");

  const handleSaveStatus = async (data) => {

  await editNasabahData({ status: newStatus }, data.id);

  if (newStatus === "CLOSED APPROVED") {
    await incrementLeaderboard(userId, token);
  }

  setData({ ...data, status: newStatus });

  setNasabahList((prev) =>
    prev.map((item) =>
      item.id === data.id ? { ...item, status: newStatus } : item
    )
  );

  onClose();
};


  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/30 z-50 transition-all duration-300
        ${isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
    >
      <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg transition-all duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">Detail Nasabah</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
        </div>

        {/* Details */}
        {data && (
          <div className="mb-4">
            <div className="font-medium text-black mb-2">Nama:</div>
            <div className="text-gray-700 mb-2">{`${data.first_name || ""} ${data.last_name || ""}`}</div>
            
            <div className="font-medium text-black mb-2">No. Telepon:</div>
            <div className="text-gray-700 mb-2">{data.phone_number || "-"}</div>
            
            <div className="font-medium text-black mb-2">Email:</div>
            <div className="text-gray-700 mb-4">{data.email || "-"}</div>


            {/* Status Saat Ini - Only show if NOT OPEN */}
            {data.status !== "OPEN" && (
              <div className="mb-4">
                <div className="font-medium text-black mb-2">Status Saat Ini:</div>
                <div className={`font-semibold ${
                  data.status === "CLOSED APPROVED" 
                    ? "text-gray-500" 
                    : data.status === "CLOSED REJECTED" 
                    ? "text-[#D32F2F]" 
                    : "text-gray-700"
                }`}>
                  {data.status === "CLOSED APPROVED" ? "Closed Approved" : 
                   data.status === "CLOSED REJECTED" ? "Closed Rejected" : 
                   data.status}
                </div>
              </div>
            )}
            
            {/* Ubah Status Dropdown - Only show if OPEN */}
            {data.status === "OPEN" && (
              <div className="mt-4">
                <label className="font-medium text-black mb-2 block">
                  Ubah Status:
                </label>
                <select
                  className={`w-full border border-gray-300 rounded-lg p-2 font-semibold ${
                    newStatus === "OPEN" 
                      ? "text-[#43A047]" 
                      : newStatus === "CLOSED_REJECTED" 
                      ? "text-[#D32F2F]" 
                      : "text-gray-500"
                  }`}
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="OPEN" className="text-[#43A047]">Open</option>
                  <option value="CLOSED APPROVED" className="text-gray-500">Closed Approved</option>
                  <option value="CLOSED REJECTED" className="text-[#D32F2F]">Closed Rejected</option>
                </select>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end mt-6 gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Tutup
          </button>

          {data?.status === "OPEN" && (
            <button
              onClick={() => handleSaveStatus(data)}
              className="px-4 py-2 bg-[#2E005D] text-white rounded-lg hover:bg-[#3f0a7a]"
            >
              Save
            </button>
          )}
        </div>

      </div>
    </div>
  );
}