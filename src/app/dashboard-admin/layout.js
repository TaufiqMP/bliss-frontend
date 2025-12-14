import SideBar from "../components/SideBar";

export default function DashboardAdminLayout({ children }) {
    return (
        <div className="flex w-full min-h-screen">
            <div className="flex flex-row bg-white">
                <SideBar />
            </div>

            <main className="flex-1 bg-white">
                {children}
            </main>
        </div>
    );
}
