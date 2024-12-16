'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { IStock } from "../stock/page";

export default function EditItemModal({ isOpen, onClose, getStock, itemToEdit }: {
    isOpen: boolean;
    onClose: () => void;
    getStock: () => void;
    itemToEdit: IStock | null;
    // onAdd: (item: { name: string; qty: string; price: string; unit: string }) => void; // Mengonversi input menjadi bentuk object
}) {
    const [id, setId] = useState("");
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [unit, setUnit] = useState("");
    // const [firstSubmit, setFirstSubmit] = useState(false);
    const [loading, setLoading] = useState(false);

    // Map `itemToEdit` to input fields when modal opens or `itemToEdit` changes
    useEffect(() => {
        if (itemToEdit) {
            setId(itemToEdit._id || "");
            setItemName(itemToEdit.name || "");
            setQuantity(itemToEdit.quantity || 0);
            setPrice(itemToEdit.price || 0);
            setUnit(itemToEdit.unit || "");
        } else {
            setItemName("");
            setQuantity(0);
            setPrice(0);
            setUnit("");
        }
    }, [itemToEdit, loading]);

    //   const handleEditItem = async (item: IStock) => {
    //     try {
    //         const res = await axios.patch("/api/stock", item);

    //         if (res?.status === 200) {
    //             Swal.fire({
    //                 icon: "success",
    //                 title: "Success",
    //                 text: 'Berhasil mengedit barang',
    //             });
    //             getStock(); // Refresh data stok setelah berhasil diubah
    //         }
    //     } catch (error) {
    //         console.error("Error editing stock:", error);
    //         Swal.fire({
    //             icon: "error",
    //             title: "Error",
    //             text: "Gagal mengedit barang",
    //         });
    //     }
    // };

    const handleEditItem = async () => {
        setLoading(true);
        if (!itemName || !quantity || !unit) {
            alert("Semua field harus diisi!");
            return;
        }



        // try {
        //   const res = await axios.post("/api/stock", newItem);

        //   if (res?.status === 201) {
        //     Swal.fire({
        //       icon: "success",
        //       title: "Success",
        //       text: res?.data?.message,
        //     });
        //   }
        //   getStock(); // Reload data setelah berhasil menghapus
        //   setLoading(false);
        // } catch (error) {
        //   console.error("Error adding item:", error);
        //   Swal.fire({
        //     icon: "error",
        //     title: "Error",
        //     text: 'gagal menambahkan barang',
        //   });
        //   setLoading(false);
        // }

        const EditItem = {
            id: id,
            name: itemName,
            quantity: Number(quantity),
            price: Number(price),
            unit: unit,
        };

        console.log(EditItem, "EditItem");

        try {
            const res = await axios.patch("/api/stock", EditItem);

            if (res?.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: 'Berhasil mengedit barang',
                });
                setLoading(false);
                getStock(); // Refresh data stok setelah berhasil diubah
            }
        } catch (error) {
            console.error("Error editing stock:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Gagal mengedit barang",
            });
            setLoading(false);
        }

        onClose(); // Tutup modal
        setItemName("");
        setQuantity(0);
        setPrice(0);
        setUnit("");
    };
    if (!isOpen) return null;



    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-96">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Ubah Barang</h2>
                    <button
                        onClick={() => {
                            setLoading(false);
                            onClose();
                        }}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                {/* Form */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nama Barang
                        </label>
                        <input
                            type="text"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Contoh: Gula"
                            disabled={loading}
                        />
                        {/* {
              firstSubmit && !itemName && <div className="p-1 pl-4 mt-2 text-sm border italic text-red-700 border-red-300 bg-red-100 rounded-md tex">tidak boleh kosong</div>
            } */}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Quantity
                        </label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Contoh: 10"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Harga
                        </label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Contoh: 10000"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Satuan
                        </label>
                        <select
                            disabled={loading}
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="">Pilih Satuan</option>
                            <option value="kg">Kg</option>
                            <option value="pcs">Pcs</option>
                            <option value="ltr">Liter</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-gray-100 border rounded-md hover:bg-gray-200"
                    >
                        Batal
                    </button>
                    <button
                        disabled={loading}
                        onClick={handleEditItem}
                        className="flex gap-2 items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                        {
                            loading &&
                            <div role="status">
                                <svg aria-hidden="true" className="w-6 h-6 text-gray-100 animate-spin dark:text-gray-600 fill-blue-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            </div>
                        }
                        Ubah
                    </button>
                </div>
            </div>
        </div>
    );
}
