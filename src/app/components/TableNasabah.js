"use client";

import { useState, useEffect } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import DetailPopup from "./DetailPopup";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function TableNasabah({ nasabahData, token, userId}) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(null);
    const [nasabahList, setNasabahList] = useState(nasabahData);
    

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const handleSave = () => setOpen(false);
    const handleOpen = (data) => {
        setData(data);
        setOpen(true);
    };

    const totalRows = nasabahList ? nasabahList.length : 0;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const startIdx = (currentPage - 1) * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;
    const paginatedData = nasabahList ? nasabahList.slice(startIdx, endIdx) : [];

    useEffect(() => {
        setNasabahList(nasabahData);
    }, [nasabahData]);

    return (
        <>
            <div className={`${inter.className} overflow-x-auto w-full pb-5`}>

                <div className="min-w-max">

                    {/* Table */}
                    <table className="table table-xs text-black w-full border border-black/20">
                        <thead className="text-black bg-gray-100">
                            <tr>
                                <th className="py-4">No.</th>
                                <th className="w-[35%] py-4">Name</th>
                                <th className="w-[15%] py-4">No. Telepon</th>
                                <th className="w-[25%] py-4">Email</th>
                                <th className="w-[15%] py-4">Status</th>
                                <th className="w-[15%] py-4 text-center">Skor</th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((data, index) => (
                                    <tr
                                        key={data.id}
                                        className="text-[14px] hover:bg-gray-50"
                                        onClick={() => handleOpen(data)}
                                    >
                                        <th className="py-5 text-center">
                                            {startIdx + index + 1}
                                        </th>
                                        <td className="py-5">{`${data.first_name} ${data.last_name}`}</td>
                                        <td className="py-5">{data.phone_number}</td>
                                        <td className="py-5">{data.email}</td>
                                        <td
                                            className={`py-2 font-semibold ${data.status === "OPEN"
                                                ? "text-[#43A047]"
                                                : data.status === "CLOSED APPROVED"
                                                    ? "text-gray-500"
                                                    : data.status === "CLOSED REJECTED"
                                                        ? "text-[#D32F2F]"
                                                        : "text-gray-500"
                                                }`}
                                        >
                                            {data.status}
                                        </td>
                                        <td 
                                          className={`py-5 text-center font-semibold ${
                                            data.prediction_score !== null
                                              ? data.prediction_score >= 0.7
                                                ? "text-[#43A047]" 
                                                : data.prediction_score >= 0.4
                                                ? "text-[#FBC02D]" 
                                                : "text-[#D32F2F]"                                              : "text-gray-500"
                                          }`}
                                        >
                                          {data.prediction_score !== null
                                            ? `${(data.prediction_score * 100).toFixed(2)}%`
                                            : "-"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="text-[15px] text-center py-15 text-gray-400"
                                    >
                                        Tidak ada data nasabah.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination - ikut lebar tabel karena berada dalam min-w-max */}
                    <div className="flex justify-between w-full items-center py-3 border border-black/20 border-t-0">
                        <button
                            className="flex ml-3 text-sm items-center gap-1 px-3 py-1 rounded border bg-white text-[#2E005D] hover:bg-gray-100 disabled:opacity-50"
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.max(prev - 1, 1)
                                )
                            }
                            disabled={currentPage === 1}
                        >
                            <MdKeyboardArrowLeft />
                            Prev
                        </button>

                        <span className="text-sm text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            className="flex text-sm mr-3 items-center gap-1 px-3 py-1 rounded border bg-white text-[#2E005D] hover:bg-gray-100 disabled:opacity-50"
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(prev + 1, totalPages)
                                )
                            }
                            disabled={currentPage === totalPages || totalPages === 0}
                        >
                            Next
                            <MdKeyboardArrowRight />
                        </button>
                    </div>
                </div>
            </div>

            <DetailPopup
                isOpen={open}
                onClose={() => setOpen(false)}
                onSave={handleSave}
                data={data}
                setData={setData}
                setNasabahList={setNasabahList}
                token={token}
                userId={userId}
            />
        </>
    );
}
