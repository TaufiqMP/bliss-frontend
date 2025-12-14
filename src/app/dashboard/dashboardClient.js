"use client";

import { useState, useEffect } from "react";
import { dummyNasabah } from "../dummy/data";
import { getGreeting } from "@/utils/timeUtils";
import { useRouter } from "next/navigation";
import ProtectedRoutes from "../components/ProtectedHocs";

import CountCard from "../components/CountCard";
import TableNasabah from "../components/TableNasabah";
import SearchBar from "../components/SearchBar";
import SortButton from "../components/SortButton";
import Leaderboard from "../components/Leaderboard";
import Sidebar from "../components/SideBar";
import Image from "next/image";
import Link from "next/link";
import { logoutUser } from "@/utils/api";

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] });

function DashboardPage({ data, token, userId, topThree, openClosed, user }) {
  const [filteredNasabah, setFilteredNasabah] = useState(data);
  const [sortBy, setSortBy] = useState("");
  const getGreetingMessage = getGreeting();
  const router = useRouter();
  console.log(`DATA : ${data}`);

  const sortedNasabah = [...filteredNasabah].sort((a, b) => {
    if (sortBy === "name") {
      const nameA = `${a.first_name || ""} ${a.last_name || ""}`.trim();
      const nameB = `${b.first_name || ""} ${b.last_name || ""}`.trim();
      return nameA.localeCompare(nameB);
    }
    if (sortBy === "status") {
      const statusOrder = { open: 1, closed_approved: 2, closed_rejected: 3 };
      const statusA = a.status?.toLowerCase().replace(/\s+/g, "_") || "";
      const statusB = b.status?.toLowerCase().replace(/\s+/g, "_") || "";
      const orderA = statusOrder[statusA] || 0;
      const orderB = statusOrder[statusB] || 0;

      return orderA - orderB;
    }
    if (sortBy === "status_reverse") {
      const statusOrder = { open: 3, closed_approved: 2, closed_rejected: 1 };
      const statusA = a.status?.toLowerCase().replace(/\s+/g, "_") || "";
      const statusB = b.status?.toLowerCase().replace(/\s+/g, "_") || "";
      const orderA = statusOrder[statusA] || 0;
      const orderB = statusOrder[statusB] || 0;

      return orderA - orderB;
    }
    if (sortBy === "score_desc") {
      const scoreA = a.prediction_score !== null ? a.prediction_score : -1;
      const scoreB = b.prediction_score !== null ? b.prediction_score : -1;
      return scoreB - scoreA;
    }
    if (sortBy === "score_asc") {
      const scoreA = a.prediction_score !== null ? a.prediction_score : 1;
      const scoreB = b.prediction_score !== null ? b.prediction_score : 1;
      return scoreA - scoreB;
    }
    return 0;
  });


  const handleLogout = async () => {
    await logoutUser();
    document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  }

  return (
    <>
      <div className="flex w-full">
        <div className="flex flex-row gap-5 bg-white">
          <Sidebar />
        </div>

        <main className="flex flex-col w-full min-h-screen bg-white">
          <div className="flex items-center justify-between h-auto my-10 w-full px-4">
            {/* Left side: greeting text */}
            <div className={`${inter.className} leading-tight`}>
              <p className="text-[24px] text-black font-semibold">
                {getGreetingMessage}, {user.user.username}!
              </p>
              <p className="text-[16px] text-black font-normal">
                Predict. Prioritize. Perform.
              </p>
            </div>

            <div className="flex md:flex-row justify-center items-center flex-col-reverse gap-2">
              <button className="btn btn-secondary !bg-red-500 !py-2 !px-3" onClick={handleLogout}>Logout</button>
              <Link
                href="/detail-users"
                className="avatar cursor-pointer ml-4"
              >
                <div className="w-14 h-14 rounded-full ring ring-primary ring-offset-2 overflow-hidden mr-2">
                  <Image
                    src={user.user.image_url || "/defaultProfile.png"}
                    alt="Profile Picture"
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                </div>
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center w-full">
            <div className="flex w-full md:w-[95%] h-auto px-4">
              <CountCard openClosed={openClosed.data} />
            </div>
            <div className="flex w-full md:w-[95%] h-auto mt-5 px-4">
              <Leaderboard topThree={topThree} />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center h-auto mt-20 mb-3 w-full">
            <div className={`${inter.className} leading-tight mb-5 flex justify-start items-center w-[92%]`}>
              <p className="text-[20px] text-black font-semibold">Daftar Nasabah</p>
            </div>

            <div className="flex justify-center items-center w-[92%] gap-3">
              <SearchBar nasabahData={data} onResultChange={setFilteredNasabah} />
              <SortButton onSort={setSortBy} sortState={sortBy} />
            </div>
          </div>

          <div className="flex items-center justify-center w-full px-4">
            <div className="flex flex-col items-center justify-center w-[95%]">
              <TableNasabah nasabahData={sortedNasabah} token={token} userId={userId} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default ProtectedRoutes(DashboardPage);