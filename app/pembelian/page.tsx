'use client';

import { useState, useEffect } from 'react';
import AddItemPembelian from '../modal/addItempembelian';
import { PlusIcon, Trash2Icon, ShoppingCartIcon } from 'lucide-react';
import axios from 'axios';
import Swal from "sweetalert2";
import FinalPembayaran from '../modal/finalPembayaran';
export interface IStock {
    _id: string;
    name: string;
    quantity: number; // Quantity available in stock
    price: number; // Price per unit
    unit: string; // Unit type (e.g., kg, pcs)
}

export interface ICartItem {
    stock: IStock;
    quantity: number; // Quantity the user wants to purchase
}

export default function Pembelian() {
    const [isClient, setIsClient] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalFinalPembayaran, setIsModalFinalPembayaran] = useState(false);
    const [cart, setCart] = useState<IStock[]>([]);
    const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null; // Avoid rendering on the server

    // Calculate the total amount
    const totalAmount = cart.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
    );

    // Handle quantity change
    const handleQuantityChange = (index: number, newQuantity: number) => {
        console.log('Index:', index, 'New Quantity:', newQuantity);
        setCart((prevCart) =>
            prevCart.map((item, i) =>
                i === index
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const handleDeleteItem = (index: number) => {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    };

    // Handle checkout
    const handleCheckout = async () => {
        setIsCheckoutLoading(true);

        try {
            const response = await axios.delete('/api/reduce-stock', {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    stockId: cart.map((item) => item._id),
                    quantity: cart.map((item) => item.quantity),
                },
            });

            if (response.status === 200) {
                // Clear cart after successful checkout
                setCart([]);
                // alert(response.data.message || 'Checkout successful!');
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: 'Berhasil dibayarkan',
                });
            } else {
                // alert(response.data.error || 'Failed to reduce stock.');
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: response.data.error,
                });
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            alert('An error occurred while processing your request.');
        } finally {
            setIsCheckoutLoading(false);
        }
    };
    return (
        <div className="p-4 w-full">
            <div className="overflow-x-auto p-4 w-full">
                <h1 className="text-lg font-bold mb-4">List Pembelian</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex justify-center items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg mb-4">
                    <PlusIcon className="h-4 w-4" /> Tambah List Pembelian
                </button>
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-center w-1/12">No</th>
                            <th className="border border-gray-300 px-4 py-2 text-left w-4/12">Nama Barang</th>
                            <th className="border border-gray-300 px-4 py-2 text-center w-3/12">
                                Harga per kg / liter / pcs
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-center w-1/12">Qty</th>
                            <th className="border border-gray-300 px-4 py-2 text-center w-4/12">Total</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {cart.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="border border-gray-300 px-4 py-10 text-center font-semibold text-xl text-gray-300"
                                >
                                    Tidak ada data
                                </td>
                            </tr>
                        )}
                        {cart.map((item: IStock, index: number) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2"> {item.name}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    Rp {item.price.toLocaleString()} / {item.unit}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <input
                                        type="number"
                                        className="w-16 text-center border rounded-md"
                                        value={item.quantity}
                                        min={1}
                                        // max={item.quantity} // Optional: Limit to available stock
                                        onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-right">
                                    Rp{' '}
                                    {(
                                        item.quantity * item.price
                                    ).toLocaleString()}
                                </td>
                                <td
                                    onClick={() => handleDeleteItem(index)}
                                    className="px-6 py-2 text-center cursor-pointer">
                                    <Trash2Icon className="h-4 w-4 text-red-500" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td
                                colSpan={4}
                                className="border border-gray-300 px-4 py-2 font-bold text-right"
                            >
                                Total
                            </td>
                            <td className="border border-gray-300 px-4 py-2 font-bold text-right">
                                Rp {totalAmount.toLocaleString()}
                            </td>
                        </tr>
                    </tfoot>
                </table>
                <div className='flex justify-end mt-4'>
                    <button
                        onClick={() => setIsModalFinalPembayaran(true)}
                        className="flex justify-center items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg mb-4 disabled:cursor-pointer disabled:bg-gray-400"
                        disabled={isCheckoutLoading || cart.length === 0}>
                        {isCheckoutLoading ? 'Processing...' : (
                            <>
                                <ShoppingCartIcon className="h-5 w-5" /> Checkout
                            </>
                        )}
                    </button>
                </div>
            </div>
            <AddItemPembelian
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                cart={cart}
                setCart={setCart}
            />
            <FinalPembayaran
                isOpen={isModalFinalPembayaran}
                onClose={() => setIsModalFinalPembayaran(false)}
                totalAmount={totalAmount}
                handleCheckout={handleCheckout}
                isCheckoutLoading={isCheckoutLoading}
            />
        </div>
    );
}
