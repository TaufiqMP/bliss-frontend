import React, { useState, useEffect, use } from "react";
import { getTotalNasabah, getTotalNasabahPrioritas } from "@/utils/api";
export default function CardAdmin() {
    const baseUrl = `http://bliss-backend-production.up.railway.app`
    const [customerData, setCustomerData] = useState(null);
    const [priorityData, setPriorityData] = useState(null)
    const [percentageCustPriority, setPercentage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTotal = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${baseUrl}/analytic/nasabah`);
                const responseJson = await response.json();
                const { data } = responseJson;
                console.log(data);
                if (!data || !data.totalNasabah) {
                    throw new Error('gagal mengambil data total nasabah');
                }
                setCustomerData(data.totalNasabah);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchTotal();
    }, [])

    useEffect(() => {
        const fetchPrioritas = async () => {
            try {
                const response = await fetch(`${baseUrl}/analytic/nasabah/priority`);
                const responseJson = await response.json();
                const { data } = responseJson;
                if (!data) {
                    throw new Error('gagal mengambil data prioritas');
                }
                setPriorityData(data.highPriorityCustomer);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchPrioritas();
    })

    useEffect(() => {
        const priorityCustPercentage = async () => {
            try {
                const Percentage = priorityData / customerData * 100;
                setPercentage(Percentage);
            } catch (error) {
                throw error
            }
        }
        priorityCustPercentage();
    })


    return (
        <div className="flex flex-col md:flex-row bg-white gap-5 w-full text-center">
            <div className="flex flex-1 flex-col justify-center items-center group relative overflow-hidden rounded-2xl p-6 bg-card border-2 border-primary/20 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:-translate-y-1">
                <div className="flex items-center text-gray-700 mb-1">
                    <span className="text-sm font-medium">Total Customer</span>
                </div>
                <p className="text-2xl font-semibold text-gray-900">{loading ? '...' : customerData}</p>
            </div>
            <div className="flex flex-1 flex-col justify-center items-center group relative overflow-hidden rounded-2xl p-6 bg-card border-2 border-primary/20 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:-translate-y-1">
                <div className="flex items-center text-gray-700 mb-1">
                    <span className="text-sm font-medium">High Probability Customer</span>
                </div>
                <p className="text-2xl font-semibold text-gray-900">{loading ? '...' : priorityData}</p>
            </div>
            {/*ini keknnya entar mau diganti pake customer yang udah diclosed*/}
            <div className="flex flex-1 flex-col items-center justify-center group relative overflow-hidden rounded-2xl p-6 bg-card border-2 border-primary/20 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:-translate-y-1">
                <span className="text-sm text-gray-700 font-medium">High Priority Customer Percentage</span>
                <div className="radial-progress bg-gray-100 text-[#3C0075] my-1" style={{ "--value": percentageCustPriority }} aria-valuenow={100} role="progressbar">
                    {loading ? '...' : `${percentageCustPriority}%`}
                </div>
            </div>
        </div >
    );
}