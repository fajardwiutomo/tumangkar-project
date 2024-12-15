/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { TrashIcon, PencilIcon, PlusIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { DataMock } from "@/mockData/dataMock";
import AddItemModal from "../modal/addItem";
import DeleteItemModal from "../modal/deleteItem";
import Pagination from "@/components/Pagination";


export default function InventoryTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [items, setItems] = useState<any>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<any>(null);
    const [stock,] = useState(DataMock);
    // mSIH BUELU


    // const openDeleteModal = (item: any) => {
    //     setItemToDelete(item);
    //     setIsDeleteModalOpen(true);
    // };

    const handleDeleteItem = () => {
        setItems(items.filter((item: any) => item.id !== itemToDelete?.id));
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
    };

    const handleAddItem = (newItem: any) => {
        setItems([...items, newItem]);
    };

    const itemsPerPage = 5; // Jumlah item per halaman
    const totalItems = 20; // Total data
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
                        <input type="text" placeholder="Cari barang..." className="border border-gray-300 px-4 py-2 rounded-lg" />
                        <button className="flex justify-center items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg"> <SearchIcon className="h-4 w-4" /> Search</button>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex justify-center items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"><PlusIcon className="h-4 w-4" />Tambah Barang</button>
                </div>
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-center">No</th>
                            <th className="border border-gray-300 px-4 py-2 text-left w-5/12">Nama Barang</th>
                            <th className="border border-gray-300 px-4 py-2 text-center w-1/12">Qty</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Satuan</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stock.map((item, index) => (
                            <tr key={item.id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.namaBarang}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{item.jumlah}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{item.satuan}</td>
                                <td className="border border-gray-300 py-2 flex justify-center gap-8">
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600 flex gap-2 justify-center items-center">
                                        <PencilIcon className="h-4 w-4" /> Edit
                                    </button>
                                    <button
                                        onClick={() => setIsDeleteModalOpen(true)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 flex gap-2 justify-center items-center">
                                        <TrashIcon className="h-4 w-4" /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
            {/* Modal */}
            <AddItemModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddItem}
            />

            {/* Modal Delete */}
            <DeleteItemModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={handleDeleteItem}
                itemName={itemToDelete?.name}
            />
        </div>
    );
}
