import Sidebar from "@/components/common/Sidebar"
import Header from "@/components/common/Header"
import { Outlet } from "react-router-dom"

export default function AdminLayout() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-4 md:p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

