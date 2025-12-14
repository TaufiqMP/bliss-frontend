export const SalesData = [
    { id: 1, rank: 1, name: "Hart Hagerty", email: "hart@gmail.com", firstJoin: '1-2-2025', status: "Aktif", totalLead: 150, konversi: "23.3%", image: "https://img.daisyui.com/images/profile/demo/2@94.webp", statusClass: "badge-success" },
    { id: 2, rank: 2, name: "Brice Swyre", email: "hart@gmail.com", firstJoin: '1-2-2025', status: "Cuti", totalLead: 95, konversi: "16.7%", image: "https://img.daisyui.com/images/profile/demo/3@94.webp", statusClass: "badge-error" },
    { id: 3, rank: 3, name: "Marjy Ferencz", email: "hart@gmail.com", firstJoin: '1-2-2025', status: "Aktif", totalLead: 120, konversi: "19.5%", image: "https://img.daisyui.com/images/profile/demo/4@94.webp", statusClass: "badge-success" },
    { id: 4, rank: 4, name: "Yancy Tear", email: "hart@gmail.com", firstJoin: '1-2-2025', status: "Aktif", totalLead: 89, konversi: "14.0%", image: "https://img.daisyui.com/images/profile/demo/5@94.webp", statusClass: "badge-success" },
];
export const findUserById = (id) => {
    return SalesData.find(user => user.id.toString() === id.toString());
};