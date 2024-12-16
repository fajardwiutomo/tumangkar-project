import Sidebar from "@/components/Sidebar";

export default function PembelianLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-4 overflow-y-auto">
                {children}
            </div>
        </div>
    );
}