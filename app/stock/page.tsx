/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { TrashIcon, PencilIcon, PlusIcon, SearchIcon, CircleArrowOutUpRightIcon } from "lucide-react";
import { useState, useEffect } from "react";
import AddItemModal from "../modal/addItem";
import DeleteItemModal from "../modal/deleteItem";
import Pagination from "@/components/Pagination";
import axios from "axios";
import Swal from "sweetalert2";
import EditItemModal from "../modal/editItem";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { loadingState } from "../state-management/state";
import Loader from "../modal/loader";

export interface IStock {
    _id: string;
    name: string;
    quantity: number;
    price: number;
    unit: string;
}

export default function InventoryTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [items, setItems] = useState<any>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<any>(null);
    const [stock, setStock] = useState<any>([]); // Ganti dari 'DataMock' ke state 'stock' yang kosong
    const [isLoading, setIsLoading] = useState(false); // State loading
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [itemToEdit, setItemToEdit] = useState<IStock | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const { data: session, status } = useSession()
    const router = useRouter();
    const [isOpen, ] = useAtom(loadingState);

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/stock");
        } else if (status === "unauthenticated") {
            router.push("/sign-in");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, status])

    // Handle fetch stock
    const getStock = async () => {
        try {
            const res = await axios.get("/api/stock");

            if (res?.status === 200) {
                console.log(res.data.stocks, "STOCK");
                setStock(res.data.stocks); // Update state dengan data stok
            }
        } catch (error) {
            console.error("Error fetching stocks:", error);
        } finally {
            setIsLoading(false); // Nonaktifkan loading setelah data dimuat
        }
    };

    useEffect(() => {
        getStock(); // Panggil API saat pertama kali mount
    }, []); // Dependency array kosong untuk hanya sekali dipanggil saat mount

    const handleDeleteItem = async () => {
        if (itemToDelete) {
            setLoadingDelete(true);
            try {
                const res = await axios.delete("/api/stock", { data: { id: itemToDelete._id } });
                if (res?.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: 'Berhasil menghapus barang',
                    });
                    setLoadingDelete(false);
                    getStock(); // Reload data setelah berhasil menghapus
                    setItemToDelete(null);
                    setIsDeleteModalOpen(false);
                }
            } catch (error) {
                setLoadingDelete(false);
                console.error("Error deleting stock:", error);
            }
        }
    };

    const searchStock = async (query: string) => {
        try {
            const res = await axios.get(`/api/search-stock?search=${query}`);
            if (res.status === 200) {
                setSearch('');
                setStock(res?.data?.stocks);
            }
        } catch (error) {
            console.error("Error searching stocks:", error);
        }
    };


    const itemsPerPage = 5; // Jumlah item per halaman
    const totalItems = stock.length; // Total dari stock yang diambil
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Handle perubahan halaman
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        console.log(`Navigasi ke halaman ${page}`);
    };




    return (
        <div className="p-4 w-full">
            <div className="overflow-x-auto p-4 w-full">
                <div className="flex justify-between">
                    <div className="flex gap-4 items-center justify-center mb-4">
                        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Cari barang..." className="border border-gray-300 px-4 py-2 rounded-lg" />
                        <button
                            disabled={!search}
                            onClick={() => searchStock(search)}
                            className="flex justify-center items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg disabled:cursor-not-allowed disabled:bg-gray-400">
                            <SearchIcon className="h-4 w-4" /> Search
                        </button>
                    </div>
                    <div className="flex gap-4 items-center">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex justify-center items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg mb-4">
                            <PlusIcon className="h-4 w-4" /> Tambah Barang
                        </button>
                        <button
                            onClick={() => {
                                getStock();
                                setSearch('');
                            }}
                            className="flex justify-center items-center gap-2 bg-white px-4 py-2 rounded-lg mb-4 text-red-500 border border-gray-500">
                            <CircleArrowOutUpRightIcon className="h-4 w-4" /> Reset
                        </button>
                    </div>
                </div>
                {isLoading ? (
                    <p>Loading...</p> // Tampilkan loading jika data belum tersedia
                ) : (
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-center">No</th>
                                <th className="border border-gray-300 px-4 py-2 text-left w-4/12">Nama Barang</th>
                                <th className="border border-gray-300 px-4 py-2 text-center w-1/12">Qty</th>
                                <th className="border border-gray-300 px-4 py-2 text-center w-3/12">Harga</th><th className="border border-gray-300 px-4 py-2 text-center w-1/12">Satuan</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                stock.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="border border-gray-300 px-4 py-10 text-center font-semibold text-xl text-gray-300">
                                            Tidak ada data
                                        </td>
                                    </tr>
                                )
                            }
                            {stock.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item: IStock, index: number) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2 text-center">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.quantity}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.unit}</td>
                                    <td className="border border-gray-300 py-2 flex justify-center gap-4">
                                        <button
                                            onClick={() => {
                                                setItemToEdit(item); // Set item yang akan diedit
                                                setIsEditModalOpen(true); // Buka modal edit
                                            }}
                                            className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600 flex gap-2 justify-center items-center">
                                            <PencilIcon className="h-4 w-4" /> Ubah
                                        </button>
                                        <button
                                            onClick={() => {
                                                setItemToDelete(item);
                                                setIsDeleteModalOpen(true);
                                            }}
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 flex gap-2 justify-center items-center">
                                            <TrashIcon className="h-4 w-4" /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            {
                stock.length > 0 && (
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                )
            }
            {/* Modal */}
            <AddItemModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                getStock={getStock}
            // onAdd={handleAddItem}
            />

            <EditItemModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                getStock={getStock}
                itemToEdit={itemToEdit}
            />

            {/* Modal Delete */}
            <DeleteItemModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={handleDeleteItem}
                itemName={itemToDelete?.name}
                loadingDelete={loadingDelete}
                setLoadingDelete={setLoadingDelete}
            />
            <Loader
                isOpen={isOpen}
            />
        </div>
    );
}
